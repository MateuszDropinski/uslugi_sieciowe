import { combineReducers } from 'redux';

import { firebaseApi } from './firebaseApi/firebaseApi';

export const rootReducer = combineReducers({
    [firebaseApi.reducerPath]: firebaseApi.reducer,
});
