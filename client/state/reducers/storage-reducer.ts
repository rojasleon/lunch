import { Ingredients, Purchase } from '@rojasleon-lunch/common';
import { ActionType } from '../action-types';
import type { Action } from '../actions';

interface CommonState<T> {
  data: T;
  loading: boolean;
  error: string;
}

interface CommonPurchase extends CommonState<Purchase[]> {
  lastPage: boolean;
  total: number;
}

interface StorageState {
  ingredients: CommonState<Ingredients[]>;
  purchases: CommonPurchase;
}

const initialState: StorageState = {
  ingredients: { data: null, loading: false, error: '' },
  purchases: { data: [], loading: false, error: '', lastPage: false, total: 0 }
};

const storageReducer = (
  state: StorageState = initialState,
  action: Action
): StorageState => {
  switch (action.type) {
    case ActionType.FETCH_INGREDIENTS_START:
      return {
        ...state,
        ingredients: { data: null, loading: true, error: '' }
      };
    case ActionType.FETCH_INGREDIENTS_COMPLETE:
      return {
        ...state,
        ingredients: { data: action.payload, loading: false, error: '' }
      };
    case ActionType.FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        ingredients: { data: null, loading: false, error: action.payload }
      };
    case ActionType.FETCH_PURCHASES_START:
      return {
        ...state,
        purchases: {
          data: [],
          loading: true,
          error: '',
          lastPage: false,
          total: 0
        }
      };
    case ActionType.FETCH_PURCHASES_COMPLETE:
      return {
        ...state,
        purchases: {
          data: action.payload.purchases,
          loading: false,
          error: '',
          lastPage: action.payload.lastPage,
          total: action.payload.total
        }
      };
    case ActionType.FETCH_PURCHASES_ERROR:
      return {
        ...state,
        purchases: {
          data: [],
          loading: false,
          error: action.payload,
          lastPage: false,
          total: 0
        }
      };
    default:
      return state;
  }
};

export default storageReducer;
