import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Users } from './types';

export type UsersState = {
    isInitialized: boolean;
    usersData: Users
};

const initialState: UsersState = { isInitialized: false, usersData: [] };

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (
            state,
            action: PayloadAction<Users>
        ) => ({ usersData: action.payload, isInitialized: true }),
    },
});

const {
    reducer,
    actions: {
        setUsers,
    },
} = usersSlice;

export type UsersAction =
    | ReturnType<typeof setUsers>;

export {
    reducer as usersReducer,
    setUsers,
};
