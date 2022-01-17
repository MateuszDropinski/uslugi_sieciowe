import * as _ from 'lodash/fp';

import { firebaseApi } from '../firebaseApi';
import { firebaseInterface } from '../../../firebase/firebaseInterface';
import { setUsers } from '../../users/slice';
import { getEmailKey } from './utils';

export const usersEndpoint = firebaseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (build) => ({
        usersData: build.query<string, void>({
            async queryFn(__, { dispatch }) {
                const listener = (data) => data && dispatch(setUsers(_.values(data)));

                return {
                    data: firebaseInterface.subscribeValue('/users', listener),
                };
            },
            async onCacheEntryAdded(_, { cacheEntryRemoved, cacheDataLoaded }) {
                await cacheEntryRemoved;
                const { data } = await cacheDataLoaded;
                firebaseInterface.unsubscribeListener(data);
            },
        }),
        setUserData: build.mutation<string, string>({
            async queryFn(name) {
                try {
                    await firebaseInterface.setValue(
                        `/users/${firebaseInterface.getUid()}`,
                        { name, email: getEmailKey() }
                    );
                    return { data: name };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

export const { useUsersDataQuery, useSetUserDataMutation } = usersEndpoint;
