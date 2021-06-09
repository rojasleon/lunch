import { useEffect, useState } from 'react';
import { Header, Card, Button } from 'semantic-ui-react';
import OrderItem from './order-item';
import Spinner from '../components/spinner';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const OrderList = () => {
  const [page, setPage] = useState(1);
  const { fetchOrders } = useActions();

  const {
    orders: { data, error, loading, lastPage, total }
  } = useTypedSelector((state) => state.kitchen);

  useEffect(() => {
    fetchOrders({ page });
  }, [page]);

  if (error) return <p>{error}</p>;

  return (
    <p>
      {loading && <Spinner />}
      <Header as="h1">Purchases List</Header>
      <Header as="h3">Total Items: {total}</Header>
      <Card.Group centered>
        {data.map((order) => (
          <OrderItem key={order._id} {...order} />
        ))}
      </Card.Group>
      {!lastPage && data.length > 0 && (
        <Button
          fluid
          style={{ marginTop: '20px' }}
          color="blue"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load more
        </Button>
      )}
    </p>
  );
};

export default OrderList;
