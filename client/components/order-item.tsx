import { Order } from '@rojasleon-lunch/common';
import { Card, Grid } from 'semantic-ui-react';
import RecipeItem from './recipe-item';
import { formattedDate } from '../utils/date';

const IngredientItem: React.FC<Order> = ({ recipe, status, createdAt }) => {
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>{status}</Card.Header>
          <Card.Meta>
            Created at:
            {/* @ts-ignore */}
            {formattedDate(new Date(parseInt(createdAt))).fullDate()}
          </Card.Meta>
          <Card.Description>
            <RecipeItem {...recipe} />
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default IngredientItem;
