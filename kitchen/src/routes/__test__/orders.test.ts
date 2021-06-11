import { OrderStatus } from '@rojasleon-lunch/common';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

describe('Orders', () => {
  it('Responds with a 201 status code when given valid credentials', async () => {
    await request(app)
      .post('/api/kitchen/orders')
      .send({ quantity: 3 })
      .expect(201);

    const orders = await Order.find({ status: OrderStatus.Pending });

    expect(orders.length).toBe(3);
  });

  it('Responds with only pending orders', async () => {
    const response = await request(app)
      .get('/api/kitchen/orders/pending')
      .send()
      .expect(200);

    expect(response.body.orders).toBeDefined();
    expect(response.body.total).toBe(3);
  });

  it('Responds with one single pending order', async () => {
    const response = await request(app)
      .get('/api/kitchen/orders/pending?limit=1')
      .send()
      .expect(200);

    expect(response.body.orders.length).toBe(1);
  });

  it('Emits an order when the event is created', async () => {
    await request(app)
      .post('/api/kitchen/orders')
      .send({ quantity: 1 })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
