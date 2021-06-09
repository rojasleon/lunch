import express from 'express';
import { Ingredient } from '../models/ingredients';

const router = express.Router();

router.get('/api/storage/ingredients', async (req, res) => {
  const ingredients = await Ingredient.find({});

  res.status(200).send(ingredients);
});

export { router as ingredientsRouter };
