import firebase from 'firebase/compat/app';
import * as _ from 'lodash/fp';

import { firebaseApi } from '../firebaseApi';
import { firebaseInterface } from '../../../firebase/firebaseInterface';
import { getAuthErrorMessage } from '../errors/authErrors';

export const signInEndpoint = firebaseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (build) => ({
        signIn: build.mutation<boolean, { email: string, password: string }>({
            async queryFn({ email, password }) {
                try {
                    const data = await firebaseInterface.signIn(email, password);
                    return { data: !!data.user };
                } catch (error) {
                    return { error: { message: getAuthErrorMessage(error.code) } };
                }
            },
        }),
        currentUser: build.query<Partial<firebase.User> | null | undefined, void>({
            async queryFn() {
                const user = firebaseInterface.getCurrentUser();
                return { data: user ? _.pick(['email'])(user) : user };
            },
        }),
    }),
});

export const { useSignInMutation, useCurrentUserQuery } = signInEndpoint;
