import axios from 'axios';
import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent } from '@rojasleon-lunch/common';
import { OrderCompletedPublisher } from '../publishers/order-completed-publisher';
import { Ingredient } from '../../models/ingredients';
import { Purchase } from '../../models/purchase';
import { queueGroupName } from './queue-group-name';
import { natsWrapper } from '../../nats-wrapper';

const URL = 'https://recruitment.alegra.com/api/farmers-market/buy';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreatedEvent;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    Object.entries(data.ingredients).map(
      async ([name, quantity]: [string, number]) => {
        const ingredient = await Ingredient.findOne({ name });

        if (!ingredient) {
          throw new Error('Ingredient did not found!');
        }

        // If we have more ingredients than the needed ones
        // just update the current quantity
        if (ingredient.quantity >= quantity) {
          ingredient.quantity -= quantity;

          await ingredient.save();
        } else {
          // Current ingredients within the db
          let currentIngredients = ingredient.quantity;

          // While current ingredients are less than the needed pieces of ingredients
          // go to the market and buy some more ingredients
          while (currentIngredients < quantity) {
            const {
              data: { quantitySold }
            } = await axios.get(`${URL}?ingredient=${name}`);
            currentIngredients += quantitySold;
          }

          const purchase = Purchase.build({
            name,
            quantity: currentIngredients - ingredient.quantity
          });

          ingredient.quantity += currentIngredients - quantity;

          // Update the previous quantity of ingredients and save
          // the purchase  history
          await ingredient.save();
          await purchase.save();
        }
      }
    );

    // Publish an event to tell the kitchen the order is ready
    new OrderCompletedPublisher(natsWrapper.client).publish({
      id: data._id
    });

    // Ack the message
    msg.ack();
  }
}
