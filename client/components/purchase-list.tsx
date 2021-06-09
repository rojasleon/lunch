import { useEffect, useState } from 'react';
import { Header, Card, Button } from 'semantic-ui-react';
import Spinner from './spinner';
import PurchaseItem from './purchase-item';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const PurchaseList = () => {
  const [page, setPage] = useState(1);
  const { fetchPurchases } = useActions();

  const {
    purchases: { data, error, loading, lastPage, total }
  } = useTypedSelector((state) => state.storage);

  useEffect(() => {
    fetchPurchases({ page });
  }, [page]);

  if (error) return <p>{error}</p>;

  return (
    <p>
      {loading && <Spinner />}
      <Header as="h1">Purchases List</Header>
      <Header as="h3">Total items: {total}</Header>
      <Card.Group centered>
        {data.map((purchase) => (
          <PurchaseItem key={purchase._id} {...purchase} />
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

export default PurchaseList;
