import { Document, Schema, Model, model } from 'mongoose';
import { OrderStatus, Recipe } from '@rojasleon-lunch/common';

interface OrderAttrs {
  recipe: string;
  status: OrderStatus;
}

interface OrderDoc extends Document {
  recipe: Recipe;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new Schema({
  status: { type: String, required: true },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: Date.now }
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

export const Order = model<OrderDoc, OrderModel>('Order', orderSchema);
