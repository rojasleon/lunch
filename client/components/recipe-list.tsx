import { useEffect } from 'react';
import { Header, Grid, Card } from 'semantic-ui-react';
import Spinner from '../components/spinner';
import RecipeItem from './recipe-item';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const RecipeList = () => {
  const { fetchRecipes } = useActions();
  const {
    recipes: { data, error, loading }
  } = useTypedSelector((state) => state.kitchen);

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (error) return <p>{error}</p>;
  if (!data?.length) return <p>There are no recipes</p>;

  return (
    <div>
      {loading && <Spinner />}
      <Header as="h1">Recipe List</Header>
      <Card.Group centered>
        {data.map((recipe) => (
          <RecipeItem key={recipe._id} {...recipe} />
        ))}
      </Card.Group>
    </div>
  );
};

export default RecipeList;
