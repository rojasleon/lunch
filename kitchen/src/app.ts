import 'express-async-errors';
import express from 'express';
import { json } from 'body-parser';
import { recipesRouter } from './routes/recipes';
import { ordersRouter } from './routes/orders';

const app = express();

app.use(json());

app.use(recipesRouter);
app.use(ordersRouter);

export { app };
