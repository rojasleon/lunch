import request from 'supertest';
import { app } from '../../app';

describe('Recipes', () => {
  it('The recipe collection has 6 items by default', async () => {
    const response = await request(app)
      .get('/api/kitchen/recipes')
      .send()
      .expect(200);

    expect(response.body.length).toEqual(6);
  });

  it('Can retrieve a random recipe', async () => {
    const response = await request(app)
      .get('/api/kitchen/recipe')
      .send()
      .expect(200);

    expect(response.body.name).toBeDefined();
    expect(response.body.ingredients).toBeDefined();
  });
});
