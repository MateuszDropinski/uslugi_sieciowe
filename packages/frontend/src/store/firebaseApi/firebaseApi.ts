import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SerializedError } from '@reduxjs/toolkit';

export const firebaseApi = createApi({
    baseQuery: fakeBaseQuery<SerializedError>(),
    endpoints: () => ({}),
});
