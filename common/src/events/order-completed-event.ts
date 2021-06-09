import { Subjects } from './subjects';

export interface OrderCompletedEvent {
  subject: Subjects.OrderCompletedEvent;
  // The id of the order
  data: {
    id: string;
  };
}
