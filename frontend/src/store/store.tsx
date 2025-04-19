import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { appReducer } from './slices/app.slice';
import { patientsReducer } from './slices/pateints.slice';

const rootReducer = combineReducers({
  app: appReducer,
  patients: patientsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});


export type AppDispatch = typeof store.dispatch;

export type AllStates = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof rootReducer>;
export type RootStateKeys = keyof RootState;
