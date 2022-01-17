import { createSelector } from '@reduxjs/toolkit';

import { State } from '../types';
import { MessagesState } from './slice';
import { Messages } from './types';

export const messagesSelector = (state: State): MessagesState => state.messages;

export const messagesDataSelector = createSelector(
    messagesSelector,
    ({ data }): Messages => data
);

export const messagesActiveUserSelector = createSelector(
    messagesSelector,
    ({ activeUser }): string => activeUser
);

export const messagesActiveConversationSelector = createSelector(
    messagesDataSelector,
    messagesActiveUserSelector,
    (data, activeUser) => data[activeUser] || []
);
