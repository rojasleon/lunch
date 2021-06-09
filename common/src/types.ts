export interface Ingredients {
  name: string;
  quantity: number;
  _id: string;
}

export interface Recipe {
  name: string;
  ingredients: Ingredients;
  _id: string;
}

export enum OrderStatus {
  // When the order is just created, and it's in process to be completed
  Pending = 'pending',
  // When the order is successfully created
  Completed = 'completed'
}

export interface Order {
  recipe: Recipe;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export interface Purchase {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  quantity: number;
  _id: string;
}
