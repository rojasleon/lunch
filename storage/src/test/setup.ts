import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { fillUpDatabase } from '../migrations';

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await fillUpDatabase();
});

beforeEach(async () => {
  jest.clearAllMocks();
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

  await mongo.stop();
  await mongoose.connection.close();
});
