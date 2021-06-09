import { Purchase } from '@rojasleon-lunch/common';
import { Card, Grid } from 'semantic-ui-react';
import { formattedDate } from '../utils/date';

const PurchaseItem: React.FC<Purchase> = ({ name, createdAt, quantity }) => {
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>
            {name} - {quantity}
          </Card.Header>
          <Card.Description>
            {formattedDate(new Date(createdAt)).fullDate()}
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default PurchaseItem;
