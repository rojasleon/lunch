import React, { useEffect, useState } from 'react';
import { OrderStatus } from '@rojasleon-lunch/common';
import { Button, Header, Message } from 'semantic-ui-react';
import Spinner from '../components/spinner';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const Home = () => {
  const { createOrder, fetchOrders } = useActions();
  const [fireEvent, setFireEvent] = useState(false);
  const [isMassive, setIsMassive] = useState(false);
  const [stop, setStop] = useState(false);
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

  useEffect(() => {
    setFireEvent(false);
  }, [createdOrder]);

  const handleAnOrder = () => {
    setFireEvent(true);
    createOrder(1);
  };

  const handleMassiveOrders = () => {
    setFireEvent(true);
    setStop(true);
    createOrder(1250);
  };

  useEffect(() => {
    let intervalId;

    if (fireEvent) {
      intervalId = setInterval(() => {
        fetchOrders({ page, status: OrderStatus.Pending });
      }, 1500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [fireEvent]);

  if (ordersError) return <p>{ordersError}</p>;
  if (createdOrderError) return <p>{createdOrderError}</p>;

  return (
    <div>
      {isMassive ? (
        <>
          <Button disabled={stop} onClick={handleMassiveOrders} color="red">
            Prepare Massive Lunches! (1250)
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
      {loadingCreatedOrder && (
        <Header as="h4">Your orders are being prepared...</Header>
      )}
      {orders.length === 0 && <Header as="h3">No orders to prepare</Header>}
      {createdOrder && <Header as="h3">Orders Completed!</Header>}
      {orders.map((order) => (
        <Message
          header={order.recipe.name}
          content={`Order Status: ${order.status.toUpperCase()}`}
        ></Message>
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
