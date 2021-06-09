import { combineReducers } from 'redux';
import kitchenReducer from './kitchen-reducer';
import storageReducer from './storage-reducer';

const reducers = combineReducers({
  kitchen: kitchenReducer,
  storage: storageReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
