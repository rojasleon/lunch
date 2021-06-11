import request from 'supertest';
import { app } from '../../app';
import { Purchase } from '../../models/purchase';

const setup = async () => {
  const purchase = Purchase.build({
    name: 'tomato',
    quantity: Math.floor(Math.random() * 5) + 1
  });

  await purchase.save();
};

describe('Purchases', () => {
  it('Responds with an empty array if no purchase was made', async () => {
    const response = await request(app)
      .get('/api/storage/purchases?page=1&limit=20')
      .send()
      .expect(200);

    expect(response.body.purchases.length).toEqual(0);
    expect(response.body.total).toEqual(0);
  });

  it('Responds with details about the purchases with valid inputs', async () => {
    for (let i = 0; i < 10; i++) {
      await setup();
    }

    const response = await request(app)
      .get('/api/storage/purchases?page=1&limit=20')
      .send()
      .expect(200);

    expect(response.body.purchases[0].name).toEqual('tomato');
    expect(response.body.total).toEqual(10);
  });
});
