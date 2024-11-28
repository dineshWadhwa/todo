import { combineReducers } from '@reduxjs/toolkit';
import todosSlice from './slices/todosSlice';

const rootReducer = combineReducers({
  todos: todosSlice,
});

export default rootReducer;