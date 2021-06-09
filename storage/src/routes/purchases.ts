import express from 'express';
import { Purchase } from '../models/purchase';

const router = express.Router();

router.get('/api/storage/purchases', async (req, res) => {
  const { limit, page } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  if (!limit || !page) {
    return res
      .status(400)
      .send(
        'Wrong use of the api, you have to provide "limit", "page" and "status" query params'
      );
  }

  // This will return a response containing the purchases within an array
  // and also it'll respond with extra details (total documents in the collection)
  const [result] = await Purchase.aggregate([
    {
      $facet: {
        purchases: [{ $limit: Number(limit) }, { $skip: skip }],
        extra: [{ $group: { _id: null, totalDocuments: { $sum: 1 } } }]
      }
    }
  ]);

  res.send({
    purchases: result.purchases,
    total: result.extra[0]?.totalDocuments || 0
  });
});

export { router as purchasesRouter };
