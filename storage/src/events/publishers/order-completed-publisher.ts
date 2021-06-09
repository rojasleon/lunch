import {
  Publisher,
  Subjects,
  OrderCompletedEvent
} from '@rojasleon-lunch/common';

export class OrderCompletedPublisher extends Publisher<OrderCompletedEvent> {
  readonly subject = Subjects.OrderCompletedEvent;
}
