import express from 'express';
import { Purchase } from '../models/purchase';

const router = express.Router();

router.get('/api/storage/purchases', async (req, res) => {
  const { limit, page } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const purchases = await Purchase.find({}).limit(Number(limit)).skip(skip);
  const totalDocs = await Purchase.find({}).countDocuments();

  res.status(200).send({ purchases, total: totalDocs });
});

export { router as purchasesRouter };
