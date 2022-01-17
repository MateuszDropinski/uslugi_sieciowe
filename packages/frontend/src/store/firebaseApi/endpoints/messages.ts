import * as _ from 'lodash/fp';

import { firebaseApi } from '../firebaseApi';
import { firebaseInterface } from '../../../firebase/firebaseInterface';
import { setMessages } from '../../messages/slice';
import { getEmailKey } from './utils';

export const messagesEndpoint = firebaseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (build) => ({
        messages: build.query<string, void>({
            async queryFn(__, { dispatch }) {
                const listener = (data) => {
                    dispatch(setMessages(
                        _.flowRight(
                            _.reduce((result, emailKey) => ({
                                ...result,
                                [emailKey]: _.flowRight(
                                    _.reduce((result, key) => [...result, { key, ...data[emailKey][key] }], []),
                                    _.keys
                                )(data[emailKey]),
                            }), {}),
                            _.keys
                        )(data)
                    ));
                };

                return {
                    data: firebaseInterface.subscribeValue(`/messages/${getEmailKey()}`, listener),
                };
            },
            async onCacheEntryAdded(_, { cacheEntryRemoved, cacheDataLoaded }) {
                await cacheEntryRemoved;
                const { data } = await cacheDataLoaded;
                firebaseInterface.unsubscribeListener(data);
            },
        }),
        setMessage: build.mutation<string, { message: string, user: string }>({
            async queryFn({ message, user }) {
                const dateKey = Date.now();
                try {
                    await firebaseInterface.setValue(
                        `/messages/${user}/${getEmailKey()}/${dateKey}`,
                        { value: message, mine: false }
                    );
                    await firebaseInterface.setValue(
                        `/messages/${getEmailKey()}/${user}/${dateKey}`,
                        { value: message, mine: true }
                    );
                    return { data: message };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

export const { useSetMessageMutation, useMessagesQuery } = messagesEndpoint;
