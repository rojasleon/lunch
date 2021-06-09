import express from 'express';
import { Recipe } from '../models/recipe';

const router = express.Router();

router.get('/api/kitchen/recipes', async (req, res) => {
  const recipes = await Recipe.find({});

  res.status(200).send(recipes);
});

router.get('/api/kitchen/recipe', async (req, res) => {
  // This aggregation will retieve out a random recipe from the db
  const recipe = await Recipe.aggregate([{ $sample: { size: 1 } }]);

  res.send(recipe[0]);
});

export { router as recipesRouter };
