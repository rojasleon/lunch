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
    // Select a random recipe
    const [recipe] = await Recipe.aggregate([{ $sample: { size: 1 } }]);

    // Build the order with a status of `pending`
    const order = Order.build({
      status: OrderStatus.Pending,
      recipe: recipe._id
    });

    // Save the order into the db
    await order.save();

    // Publish an event to the storage service to tell them
    // that we need some ingredients
    new OrderCreatedPublisher(natsWrapper.client).publish({
      ingredients: recipe.ingredients,
      name: recipe.name,
      _id: order._id
    });
  }

  res.status(201).send({ success: true });
});

router.get('/api/kitchen/orders/pending', async (req, res) => {
  const { limit, page } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const orders = await Order.find({ status: OrderStatus.Pending })
    .populate('recipe')
    .limit(Number(limit))
    .skip(skip);

  // Total documents in the database with a pending status
  const totalDocs = await Order.find({
    status: OrderStatus.Pending
  }).countDocuments();

  res.status(200).send({ orders, total: totalDocs });
});

router.get('/api/kitchen/orders/completed', async (req, res) => {
  const { limit, page } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const orders = await Order.find({ status: OrderStatus.Completed })
    .populate('recipe')
    .limit(Number(limit))
    .skip(skip);

  // Total documents in the database with a completed status
  const totalDocs = await Order.find({
    status: OrderStatus.Completed
  }).countDocuments();

  res.status(200).send({ orders, total: totalDocs });
});

// router.get('/api/kitchen/orders', async (req, res) => {
//   const { limit, page, status } = req.query;
//   const skip = (Number(page) - 1) * Number(limit);

//   if (!limit || !page || !status) {
//     return res
//       .status(400)
//       .send(
//         'Wrong use of the api, you have to provide "limit", "page" and "status" query params'
//       );
//   }

//   // This will return a response containing the orders within an array
//   // and also it'll respond with extra details (total documents in the collection)
//   const [result] = await Order.aggregate([
//     {
//       $facet: {
//         orders: [
//           // Match orders with `status` with the provided one ['pending', 'completed']
//           {
//             $match: {
//               status: { $eq: status }
//             }
//           },
//           // Populate recipe
//           {
//             $lookup: {
//               from: 'recipes',
//               localField: 'recipe',
//               foreignField: '_id',
//               as: 'recipe'
//             }
//           },
//           // Give us just some docs with the limit and skip option and
//           // deconstruct the array recipe and output a document for each elements
//           { $limit: Number(limit) },
//           { $skip: skip },
//           { $unwind: '$recipe' }
//         ],
//         // Count total of documents within the collection
//         extra: [{ $group: { _id: null, totalDocuments: { $sum: 1 } } }]
//       }
//     }
//   ]);

//   res.send({
//     orders: result.orders,
//     total: result.extra[0]?.totalDocuments || 0
//   });
// });

export { router as ordersRouter };
