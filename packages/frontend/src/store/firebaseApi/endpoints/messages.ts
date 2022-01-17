import * as _ from 'lodash/fp';

import { firebaseApi } from '../firebaseApi';
import { firebaseInterface } from '../../../firebase/firebaseInterface';
import { setMessages } from '../../messages/slice';
import { getEmailKey } from './utils';

type SetMessage = {
    user: string;
    message: string;
    dateKey: number;
}

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
        setMessage: build.mutation<SetMessage, SetMessage>({
            async queryFn({ message, user, dateKey }) {
                try {
                    await firebaseInterface.setValue(
                        `/messages/${user}/${getEmailKey()}/${dateKey}`,
                        { value: message, mine: false }
                    );
                    await firebaseInterface.setValue(
                        `/messages/${getEmailKey()}/${user}/${dateKey}`,
                        { value: message, mine: true }
                    );
                    return { data: { dateKey, message, user } };
                } catch (error) {
                    return { error };
                }
            },
        }),
        setToxicity: build.mutation<void, { user: string, dateKey: number }>({
            async queryFn({ dateKey, user }) {
                try {
                    await firebaseInterface.setValue(
                        `/messages/${user}/${getEmailKey()}/${dateKey}/toxicity`,
                        true
                    );
                    return { data: null };
                } catch (error) {
                    return { error };
                }
            },
        }),
        removeToxicity: build.mutation<void, { user: string, dateKey: number}>({
            async queryFn({ dateKey, user }) {
                try {
                    await firebaseInterface.setValue(
                        `/messages/${getEmailKey()}/${user}/${dateKey}/toxicity`,
                        false
                    );
                    return { data: null };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

export const { useSetMessageMutation, useMessagesQuery, useSetToxicityMutation, useRemoveToxicityMutation } = messagesEndpoint;
