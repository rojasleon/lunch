import { Recipe } from '@rojasleon-lunch/common';
import { Card, Grid } from 'semantic-ui-react';

const RecipeItem: React.FC<Recipe> = ({ name, ingredients }) => {
  const ingredientsArr = Object.entries(ingredients);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{ingredientsArr.length}</Card.Meta>
        <Card.Description>
          {ingredientsArr.map(([k, v]) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Name: {k}</p>
              <p>Quantity: {v}</p>
            </div>
          ))}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default RecipeItem;
