import {
  Publisher,
  Subjects,
  OrderCreatedEvent
} from '@rojasleon-lunch/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreatedEvent;
}
