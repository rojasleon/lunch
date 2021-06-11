import { Ingredients, Order, Purchase, Recipe } from '@rojasleon-lunch/common';
import type { ActionType } from '../action-types';

interface FetchRecipesStartAction {
  type: ActionType.FETCH_RECIPES_START;
}

interface FetchRecipesCompleteAction {
  type: ActionType.FETCH_RECIPES_COMPLETE;
  payload: Recipe[];
}

interface FetchRecipesErrorAction {
  type: ActionType.FETCH_RECIPES_ERROR;
  payload: string;
}

interface SelectRecipeStartAction {
  type: ActionType.SELECT_RECIPE_START;
}

interface SelectRecipeCompleteAction {
  type: ActionType.SELECT_RECIPE_COMPLETE;
  payload: Recipe;
}

interface SelectRecipeErrorAction {
  type: ActionType.SELECT_RECIPE_ERROR;
  payload: string;
}

interface FetchIngredientsStartAction {
  type: ActionType.FETCH_INGREDIENTS_START;
}

interface FetchIngredientsCompleteAction {
  type: ActionType.FETCH_INGREDIENTS_COMPLETE;
  payload: Ingredients[];
}

interface FetchIngredientsErrorAction {
  type: ActionType.FETCH_INGREDIENTS_ERROR;
  payload: string;
}

interface FetchPurchasesStartAction {
  type: ActionType.FETCH_PURCHASES_START;
}

interface FetchPurchasesCompleteAction {
  type: ActionType.FETCH_PURCHASES_COMPLETE;
  payload: {
    purchases: Purchase[];
    lastPage: boolean;
    total: number;
  };
}

interface FetchPurchasesErrorAction {
  type: ActionType.FETCH_PURCHASES_ERROR;
  payload: string;
}

interface FetchCompletedOrdersStartAction {
  type: ActionType.FETCH_COMPLETED_ORDERS_START;
}

interface FetchCompletedOrdersCompleteAction {
  type: ActionType.FETCH_COMPLETED_ORDERS_COMPLETE;
  payload: {
    orders: Order[];
    lastPage: boolean;
    total: number;
  };
}

interface FetchCompletedOrdersErrorAction {
  type: ActionType.FETCH_COMPLETED_ORDERS_ERROR;
  payload: string;
}

interface FetchPendingOrdersStartAction {
  type: ActionType.FETCH_PENDING_ORDERS_START;
}

interface FetchPendingOrdersCompleteAction {
  type: ActionType.FETCH_PENDING_ORDERS_COMPLETE;
  payload: {
    orders: Order[];
    lastPage: boolean;
    total: number;
  };
}

interface FetchPendingOrdersErrorAction {
  type: ActionType.FETCH_PENDING_ORDERS_ERROR;
  payload: string;
}

interface CreateOrderStartAction {
  type: ActionType.CREATE_ORDER_START;
}

interface CreateOrderCompleteAction {
  type: ActionType.CREATE_ORDER_COMPLETE;
  payload: Order;
}

interface CreateOrderErrorAction {
  type: ActionType.CREATE_ORDER_ERROR;
  payload: string;
}

export type Action =
  | FetchRecipesStartAction
  | FetchRecipesCompleteAction
  | FetchRecipesErrorAction
  | SelectRecipeStartAction
  | SelectRecipeCompleteAction
  | SelectRecipeErrorAction
  | FetchIngredientsStartAction
  | FetchIngredientsCompleteAction
  | FetchIngredientsErrorAction
  | FetchPurchasesStartAction
  | FetchPurchasesCompleteAction
  | FetchPurchasesErrorAction
  | FetchCompletedOrdersStartAction
  | FetchCompletedOrdersCompleteAction
  | FetchCompletedOrdersErrorAction
  | FetchPendingOrdersStartAction
  | FetchPendingOrdersCompleteAction
  | FetchPendingOrdersErrorAction
  | CreateOrderStartAction
  | CreateOrderCompleteAction
  | CreateOrderErrorAction;
