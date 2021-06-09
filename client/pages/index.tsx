import React, { useEffect, useState } from 'react';
import { OrderStatus } from '@rojasleon-lunch/common';
import { Button, Header, Message } from 'semantic-ui-react';
import Spinner from '../components/spinner';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const Home = () => {
  const { createOrder, fetchOrders } = useActions();
  const [fireEvent, setFireEvent] = useState(false);
  const [page, setPage] = useState(1);
  const {
    orders: {
      data: orders,
      loading: loadingOrders,
      error: ordersError,
      lastPage
    },
    createdOrder: {
      data: createdOrder,
      loading: loadingCreatedOrder,
      error: createdOrderError
    }
  } = useTypedSelector((state) => state.kitchen);

  const handleClick = () => {
    createOrder(500);
    setFireEvent(true);
  };

  useEffect(() => {
    let intervalId;

    if (fireEvent) {
      intervalId = setInterval(() => {
        fetchOrders({ page, status: OrderStatus.Pending });
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [fireEvent]);

  if (ordersError) return <p>{ordersError}</p>;
  if (createdOrderError) return <p>{createdOrderError}</p>;

  return (
    <div>
      <Button onClick={handleClick} color="green">
        Prepare Free Lunch
      </Button>
      {loadingOrders && <Spinner />}
      {loadingCreatedOrder && (
        <Header as="h4">Your orders are being prepared...</Header>
      )}
      {orders.length === 0 && <Header as="h3">No orders to prepare</Header>}
      {createdOrder && <p>Orders Completed!</p>}
      {orders.map((order) => (
        <Message
          header={order.recipe.name}
          content={`Order Status: ${order.status.toUpperCase()}`}
        ></Message>
      ))}
      {!lastPage && orders.length > 0 && (
        <div>
          <Button color="blue" onClick={() => setPage((prev) => prev + 1)}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
