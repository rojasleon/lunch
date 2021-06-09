// Technically IS NOT a migration!

// I'm not a big fan of writing databases with default values
// That is quite risky and it's only used at the beginning
// It would be great if the specifications will say something like:
// "make sure the people in the food storage are able to create/modify ingredients"
// So, this approach will work just fine
// It'll run once at the beginning of the app to fill up the database
// with default ingredients
import { connection } from 'mongoose';
import { defaultIngredients } from '../utils';

export const fillUpDatabase = async () => {
  const length = await connection.db.collection('ingredients').countDocuments();

  if (length === 0) {
    const collection = await connection.db.createCollection('ingredients');

    await collection
      .insertMany(defaultIngredients)
      .then(() => console.log('Migration went pretty good!'));
  }
};
