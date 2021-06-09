import { Document, Model, Schema, model } from 'mongoose';

interface PurchaseAttrs {
  name: string;
  quantity: number;
}

interface PurchaseDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  quantity: number;
}

interface PurchaseModel extends Model<PurchaseDoc> {
  build(attrs: PurchaseAttrs): PurchaseDoc;
}

const purchaseSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
});

purchaseSchema.statics.build = (attrs: PurchaseAttrs) => {
  return new Purchase(attrs);
};

export const Purchase = model<PurchaseDoc, PurchaseModel>(
  'Purchase',
  purchaseSchema
);
