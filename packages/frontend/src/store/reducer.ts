import { combineReducers } from 'redux';

import { firebaseApi } from './firebaseApi/firebaseApi';
import { usersReducer } from './users/slice';

export const rootReducer = combineReducers({
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    users: usersReducer,
});
