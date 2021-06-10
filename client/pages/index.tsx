import React, { useEffect, useState } from 'react';
import { OrderStatus } from '@rojasleon-lunch/common';
import { Button, Header, Message } from 'semantic-ui-react';
import Spinner from '../components/spinner';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const Home = () => {
  const { createOrder, fetchOrders } = useActions();
  const [isMassive, setIsMassive] = useState(false);
  const [stop, setStop] = useState(false);
  const [page, setPage] = useState(1);
  const {
    orders: {
      data: orders,
      loading: loadingOrders,
      error: ordersError,
      lastPage
    }
  } = useTypedSelector((state) => state.kitchen);

  const handleAnOrder = () => {
    createOrder(1);
  };

  const handleMassiveOrders = () => {
    setStop(true);
    createOrder(100);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchOrders({ page, status: OrderStatus.Pending });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (ordersError) return <p>{ordersError}</p>;

  return (
    <div>
      {isMassive ? (
        <>
          <Button disabled={stop} onClick={handleMassiveOrders} color="red">
            Prepare Massive Lunches! (100)
          </Button>
          <Header
            as="h5"
            color="green"
            onClick={() => {
              setIsMassive(false);
              setStop(false);
            }}
          >
            Change to light mode
          </Header>
        </>
      ) : (
        <>
          <Button onClick={handleAnOrder} color="green">
            Prepare Free Lunch
          </Button>
          <Header as="h5" color="red" onClick={() => setIsMassive(true)}>
            Change to massive mode
          </Header>
        </>
      )}
      {loadingOrders && <Spinner />}
      {orders.length === 0 && <Header as="h3">No orders to prepare</Header>}
      {orders.map((order) => (
        <>
          {order.status === OrderStatus.Pending && (
            <Message
              header={order.recipe.name}
              content={`Order Status: ${order.status.toUpperCase()}`}
            ></Message>
          )}
        </>
      ))}
      {!lastPage && orders.length > 0 && (
        <Button fluid color="blue" onClick={() => setPage((prev) => prev + 1)}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default Home;
