import { ThunkAction, ThunkDispatch as ThunkDispatchBase } from '@reduxjs/toolkit';

import { rootReducer } from './reducer';
import { store } from './store';

export type RootAction = any;

export type State = ReturnType<typeof rootReducer>;

export type ThunkDispatch = ThunkDispatchBase<State, {}, RootAction>

export type ThunkResult<R = void> = ThunkAction<R, State, {}, RootAction>

export type AppDispatch = typeof store.dispatch;
