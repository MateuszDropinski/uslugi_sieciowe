import React from 'react';
import { useRoutes } from 'react-router-dom';
import styled from 'styled-components';
import * as _ from 'lodash/fp';

import { appRoutes } from './appRoutes';
import { useCurrentUserQuery } from '../../store/firebaseApi/endpoints/signIn';
import { firebaseInterface } from '../../firebase/firebaseInterface';
import { Loader } from '../../components/Loader/Loader';

const LoaderWrapper = styled.div`
    width: 20rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const AppRouter = () => {
    const { data, refetch } = useCurrentUserQuery();
    const routes = useRoutes(appRoutes(!!data));

    React.useEffect(() => {
        firebaseInterface.subscribeAuthStateChanged(() => refetch());
    }, []);

    if (_.isUndefined(data)) {
        return <LoaderWrapper><Loader /></LoaderWrapper>;
    }

    return routes;
};
