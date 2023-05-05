import { combineReducers, configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { apiSlice } from './api/apiSlice';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import foodReducer from './slices/foodSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  food: foodReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
