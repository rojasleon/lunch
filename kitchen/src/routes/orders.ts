import express from 'express';
import { OrderStatus } from '@rojasleon-lunch/common';
import { Order } from '../models/order';
import { Recipe } from '../models/recipe';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

// Not ideal, but this makes easy the use of massive orders
router.post('/api/kitchen/orders', async (req, res) => {
  const { quantity = 1 } = req.body;
  for (let i = 0; i < quantity; i++) {
    const [recipe] = await Recipe.aggregate([{ $sample: { size: 1 } }]);

    const order = Order.build({ status: OrderStatus.Pending, recipe });

    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
      ingredients: recipe.ingredients,
      name: recipe.name,
      _id: order._id
    });
  }
  res.status(201).send({ message: 'All orders completed!' });
});

router.get('/api/kitchen/orders', async (req, res) => {
  const { limit, page, status } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  if (!limit || !page || !status) {
    return res
      .status(400)
      .send(
        'Wrong use of the api, you have to provide "limit", "page" and "status" query params'
      );
  }

  // This will return a response containing the orders within an array
  // and also it'll respond with extra details (total documents in the collection)
  const [result] = await Order.aggregate([
    {
      $facet: {
        orders: [
          {
            $match: {
              status: { $eq: status }
            }
          },
          {
            $lookup: {
              from: 'recipes',
              localField: 'recipe',
              foreignField: '_id',
              as: 'recipe'
            }
          },
          { $limit: Number(limit) },
          { $skip: skip },
          { $unwind: '$recipe' }
        ],
        extra: [{ $group: { _id: null, totalDocuments: { $sum: 1 } } }]
      }
    }
  ]);

  res.send({
    orders: result.orders,
    total: result.extra[0]?.totalDocuments || 0
  });
});

export { router as ordersRouter };
