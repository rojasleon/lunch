import { Ingredients } from '@rojasleon-lunch/common';
import { Card, Grid } from 'semantic-ui-react';

const IngredientItem: React.FC<Ingredients> = ({ name, quantity }) => {
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>Quantity: {quantity}</Card.Meta>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default IngredientItem;
