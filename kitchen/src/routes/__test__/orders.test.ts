import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

describe('Orders', () => {
  it('Responds with a 201 status code when given valid credentials', async () => {
    await request(app)
      .post('/api/kitchen/orders')
      .send({ quantity: 1 })
      .expect(201);
  });

  it('Emits an order when the event is created', async () => {
    await request(app)
      .post('/api/kitchen/orders')
      .send({ quantity: 1 })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });

  it('Returns a 400 providing incorrect query params', async () => {
    await request(app)
      .post('/api/kitchen/orders')
      .send({ quantity: 1 })
      .expect(201);

    await request(app).get('/api/kitchen/orders?page=1').send().expect(400);
  });

  it('Returns details about the order when providing valid credentials', async () => {
    await request(app)
      .post('/api/kitchen/orders')
      .send({ quantity: 1 })
      .expect(201);

    const res = await request(app)
      .get('/api/kitchen/orders?page=1&limit=20&status=pending')
      .send()
      .expect(200);

    expect(res.body.orders).toBeDefined();
    expect(res.body.total).toBeDefined();
  });

  it('Returns the correct length of orders providing a valid query as limit/page/status', async () => {
    await request(app)
      .post('/api/kitchen/orders')
      .send({ quantity: 1 })
      .expect(201);

    const resOne = await request(app)
      .get('/api/kitchen/orders?page=1&limit=1&status=pending')
      .send()
      .expect(200);

    expect(resOne.body.orders.length).toBe(1);

    const resTwo = await request(app)
      .get('/api/kitchen/orders?page=2&limit=1&status=pending')
      .send()
      .expect(200);

    expect(resTwo.body.orders.length).toBe(0);
  });
});
