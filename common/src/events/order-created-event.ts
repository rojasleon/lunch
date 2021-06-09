import { Subjects } from './subjects';
import { Recipe } from '../types';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreatedEvent;
  data: Recipe;
}
