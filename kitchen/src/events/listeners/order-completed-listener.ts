import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  OrderCompletedEvent,
  OrderStatus
} from '@rojasleon-lunch/common';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCompletedListener extends Listener<OrderCompletedEvent> {
  readonly subject = Subjects.OrderCompletedEvent;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCompletedEvent['data'], msg: Message) {
    const order = await Order.findById(data.id);

    if (!order) {
      throw new Error('Order did not found');
    }

    order.set({ status: OrderStatus.Completed });

    await order.save();

    msg.ack();
  }
}
