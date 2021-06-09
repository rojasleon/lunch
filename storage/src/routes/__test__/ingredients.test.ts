import request from 'supertest';
import { app } from '../../app';

describe('Ingredients', () => {
  it('There are 10 differents ingredients with 5 pieces each one', async () => {
    const response = await request(app)
      .get('/api/storage/ingredients')
      .send()
      .expect(200);

    // 10 differents ingredients
    expect(response.body.length).toBe(10);
  });
});
