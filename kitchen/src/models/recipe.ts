import { Document, Schema, Model, model } from 'mongoose';
import { Ingredients } from '@rojasleon-lunch/common';

interface RecipeAttrs {
  name: string;
  ingredients: Ingredients;
}

interface RecipeDoc extends Document {
  name: string;
  ingredients: Ingredients;
}

interface RecipeModel extends Model<RecipeDoc> {
  build(attrs: RecipeAttrs): RecipeDoc;
}

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: {
    tomato: { type: Number, required: true },
    lemon: { type: Number, required: true },
    potato: { type: Number, required: true },
    rice: { type: Number, required: true },
    ketchup: { type: Number, required: true },
    lettuce: { type: Number, required: true },
    onion: { type: Number, required: true },
    cheese: { type: Number, required: true },
    meat: { type: Number, required: true },
    chicken: { type: Number, required: true }
  }
});

recipeSchema.statics.build = (attrs: RecipeAttrs) => {
  return new Recipe(attrs);
};

export const Recipe = model<RecipeDoc, RecipeModel>('Recipe', recipeSchema);
