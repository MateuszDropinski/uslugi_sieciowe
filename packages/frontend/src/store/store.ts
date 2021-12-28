import { configureStore, Middleware, Store as BaseStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducer';
import { RootAction, State, ThunkDispatch } from './types';
import { firebaseApi } from './firebaseApi/firebaseApi';

export type Store = BaseStore<State, RootAction> & { dispatch: ThunkDispatch };

export const store = configureStore<State, RootAction, Middleware<{}, State>[]>({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        firebaseApi.middleware,
    ],
}) as Store;
