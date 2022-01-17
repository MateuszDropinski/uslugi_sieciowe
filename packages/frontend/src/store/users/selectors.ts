import { createSelector } from '@reduxjs/toolkit';
import * as _ from 'lodash/fp';

import { State } from '../types';
import { UsersState } from './slice';
import { User } from './types';
import { firebaseInterface } from '../../firebase/firebaseInterface';

export const usersSelector = (state: State): UsersState => state.users;

export const usersIsInitializedSelector = createSelector(
    usersSelector,
    ({ isInitialized }) => isInitialized
);

export const usersDataSelector = createSelector(
    usersSelector,
    ({ usersData }) => usersData
);

export const usersDataCurrentSelector = createSelector(
    usersDataSelector,
    _.find<User>(({ email }) => email === firebaseInterface.getCurrentUser().email)
);

export const usersDataWithoutCurrentSelector = createSelector(
    usersDataSelector,
    usersDataCurrentSelector,
    (users, currentUser) => users.filter(({ email }) => email !== currentUser.email)
);
