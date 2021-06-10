import axios from 'axios';
import type { Dispatch } from 'redux';
import { Order, OrderStatus, Purchase, Recipe } from '@rojasleon-lunch/common';
import { ActionType } from '../action-types';
import { Action } from '../actions';

// Fetch the 6 recipes
export const fetchRecipes = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_RECIPES_START });

    try {
      const { data } = await axios.get<Recipe[]>('/api/kitchen/recipes');

      dispatch({ type: ActionType.FETCH_RECIPES_COMPLETE, payload: data });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_RECIPES_ERROR,
        payload: err.response.data
      });
    }
  };
};

// Randomly select a recipe
export const selectRecipe = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SELECT_RECIPE_START });

    try {
      const { data } = await axios.get<Recipe>('/api/kitchen/recipe');

      dispatch({ type: ActionType.SELECT_RECIPE_COMPLETE, payload: data });
    } catch (err) {
      dispatch({
        type: ActionType.SELECT_RECIPE_ERROR,
        payload: err.response.data
      });
    }
  };
};

export const fetchOrders = ({
  page = 1,
  limit = 20,
  status = OrderStatus.Completed
}: {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_ORDERS_START });

    try {
      const {
        data: { orders, total }
      } = await axios.get<{ orders: Order[]; total: number }>(
        `/api/kitchen/orders?page=${page}&limit=${limit}&status=${status}`
      );

      dispatch({
        type: ActionType.FETCH_ORDERS_COMPLETE,
        payload: {
          orders,
          // make sure you handle the case in where you just got the last orders
          lastPage: orders.length !== limit,
          total
        }
      });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_ORDERS_ERROR,
        payload: err.response.data
      });
    }
  };
};

export const createOrder = (quantity: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CREATE_ORDER_START });

    try {
      const { data } = await axios.post<Order>('/api/kitchen/orders', {
        quantity
      });

      dispatch({ type: ActionType.CREATE_ORDER_COMPLETE, payload: data });
    } catch (err) {
      dispatch({
        type: ActionType.CREATE_ORDER_ERROR,
        payload: err.response.data
      });
    }
  };
};

export const fetchIngredients = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_INGREDIENTS_START });

    try {
      const { data } = await axios.get('/api/storage/ingredients');

      dispatch({ type: ActionType.FETCH_INGREDIENTS_COMPLETE, payload: data });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_INGREDIENTS_ERROR,
        payload: err.response.data
      });
    }
  };
};

export const fetchPurchases = ({
  page = 1,
  limit = 20
}: {
  page?: number;
  limit?: number;
}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_PURCHASES_START });

    try {
      const {
        data: { purchases, total }
      } = await axios.get<{ purchases: Purchase[]; total: number }>(
        `/api/storage/purchases?page=${page}&limit=${limit}`
      );

      dispatch({
        type: ActionType.FETCH_PURCHASES_COMPLETE,
        payload: {
          purchases,
          total,
          lastPage: purchases.length !== limit
        }
      });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_PURCHASES_ERROR,
        payload: err.response.data
      });
    }
  };
};
