import 'express-async-errors';
import express from 'express';
import { json } from 'body-parser';
import { ingredientsRouter } from './routes/ingredients';
import { purchasesRouter } from './routes/purchases';

const app = express();

app.use(json());

app.use(ingredientsRouter);
app.use(purchasesRouter);

export { app };
