import { combineReducers } from 'redux';

import { firebaseApi } from './firebaseApi/firebaseApi';
import { usersReducer } from './users/slice';
import { messagesReducer } from './messages/slice';

export const rootReducer = combineReducers({
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    users: usersReducer,
    messages: messagesReducer,
});
