import { Document, Schema, model } from 'mongoose';

interface IngredientDoc extends Document {
  name: string;
  quantity: number;
}

const ingredientsSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
});

export const Ingredient = model<IngredientDoc>('Ingredient', ingredientsSchema);
