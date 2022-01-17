import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Messages } from './types';

export type MessagesState = {
    activeUser?: string;
    data: Messages
};

const initialState: MessagesState = { activeUser: '', data: {} };

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (
            state,
            action: PayloadAction<Messages>
        ) => {
            state.data = action.payload;
        },
        setActiveUser: (
            state,
            action: PayloadAction<string>
        ) => {
            state.activeUser = action.payload;
        },
    },
});

const {
    reducer,
    actions: {
        setActiveUser,
        setMessages,
    },
} = messagesSlice;

export type MessagesAction =
    | ReturnType<typeof setActiveUser>
    | ReturnType<typeof setMessages>;

export {
    reducer as messagesReducer,
    setActiveUser,
    setMessages,
};
