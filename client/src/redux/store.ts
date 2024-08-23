import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import auth from "../features/auth.slice";
import players from "../features/players.slice";
import { api } from "../share/api";
import { listenerMiddleware } from "../middleware/auth";

const reducers = combineReducers({
  auth,
  players,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;