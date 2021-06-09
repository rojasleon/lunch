import { useEffect } from 'react';
import { Header, Card } from 'semantic-ui-react';
import IngredientItem from './ingredient-item';
import Spinner from './spinner';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const IngredientList = () => {
  const { fetchIngredients } = useActions();
  const {
    ingredients: { data, error, loading }
  } = useTypedSelector((state) => state.storage);

  useEffect(() => {
    fetchIngredients();
  }, []);

  if (error) return <p>{error}</p>;
  if (!data?.length) return <p>There are no ingredients</p>;

  return (
    <div>
      {loading && <Spinner />}
      <Header as="h1">Ingredients List</Header>
      <Card.Group centered>
        {data.map((ingredient) => (
          <IngredientItem key={ingredient._id} {...ingredient} />
        ))}
      </Card.Group>
    </div>
  );
};

export default IngredientList;
