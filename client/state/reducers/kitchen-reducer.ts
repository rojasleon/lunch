import { Order, Recipe } from '@rojasleon-lunch/common';
import { ActionType } from '../action-types';
import type { Action } from '../actions';

interface CommonState<T> {
  data: T;
  loading: boolean;
  error: string;
}

interface CommonOrders extends CommonState<Order[]> {
  lastPage: boolean;
  total: number;
}

interface KitchenState {
  recipes: CommonState<Recipe[]>;
  selectedRecipe: CommonState<Recipe | null>;
  orders: CommonOrders;
  createdOrder: CommonState<string>;
}

const initialState: KitchenState = {
  recipes: {
    data: [],
    loading: false,
    error: ''
  },
  selectedRecipe: { data: null, loading: false, error: '' },
  orders: { data: [], lastPage: false, loading: false, error: '', total: 0 },
  createdOrder: { data: '', loading: false, error: '' }
};

const kitchenReducer = (
  state: KitchenState = initialState,
  action: Action
): KitchenState => {
  switch (action.type) {
    case ActionType.FETCH_RECIPES_START:
      return { ...state, recipes: { data: [], error: '', loading: true } };
    case ActionType.FETCH_RECIPES_COMPLETE:
      return {
        ...state,
        recipes: { data: action.payload, error: '', loading: false }
      };
    case ActionType.FETCH_RECIPES_ERROR:
      return {
        ...state,
        recipes: { data: [], error: action.payload, loading: false }
      };
    case ActionType.SELECT_RECIPE_START:
      return {
        ...state,
        selectedRecipe: { data: null, error: '', loading: true }
      };
    case ActionType.SELECT_RECIPE_COMPLETE:
      return {
        ...state,
        selectedRecipe: { data: action.payload, error: '', loading: false }
      };
    case ActionType.SELECT_RECIPE_ERROR:
      return {
        ...state,
        selectedRecipe: { data: null, error: action.payload, loading: false }
      };
    case ActionType.FETCH_ORDERS_START:
      return {
        ...state,
        orders: {
          data: [],
          error: '',
          loading: true,
          lastPage: false,
          total: 0
        }
      };
    case ActionType.FETCH_ORDERS_COMPLETE:
      return {
        ...state,
        orders: {
          data: action.payload.orders,
          error: '',
          loading: false,
          lastPage: action.payload.lastPage,
          total: action.payload.total
        }
      };
    case ActionType.FETCH_ORDERS_ERROR:
      return {
        ...state,
        orders: {
          data: null,
          error: action.payload,
          loading: false,
          lastPage: false,
          total: 0
        }
      };
    case ActionType.CREATE_ORDER_START:
      return {
        ...state,
        createdOrder: { data: null, error: '', loading: true }
      };
    case ActionType.CREATE_ORDER_COMPLETE:
      return {
        ...state,
        createdOrder: { data: action.payload, error: '', loading: false }
      };
    case ActionType.CREATE_ORDER_ERROR:
      return {
        ...state,
        createdOrder: { data: null, error: action.payload, loading: false }
      };
    default:
      return state;
  }
};

export default kitchenReducer;
