import React from 'react';
import styled from 'styled-components';

import { useUsersDataQuery } from '../store/firebaseApi/endpoints/users';
import { useAppSelector } from '../store/hooks';
import { usersDataCurrentSelector, usersIsInitializedSelector } from '../store/users/selectors';
import { Loader } from '../components/Loader/Loader';
import { UserData } from '../components/UserData/UserData';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Chat } from '../components/Chat/Chat';
import { getColor } from '../theme';
import { useMessagesQuery } from '../store/firebaseApi/endpoints/messages';

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
`;

const LoaderWrapper = styled.div`
    width: 20rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const AppWrapper = styled.div`
    display: flex;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    background-color: ${getColor('background')};
`;

export const MainPage = () => {
    useUsersDataQuery();
    useMessagesQuery();

    const isInitialized = useAppSelector(usersIsInitializedSelector);
    const userData = useAppSelector(usersDataCurrentSelector);

    return (
        <StyledWrapper>
            {
                isInitialized
                    ? userData
                        ? (
                            <AppWrapper>
                                <Sidebar />
                                <Chat />
                            </AppWrapper>
                        )
                        : <UserData />
                    : <LoaderWrapper><Loader /></LoaderWrapper>
            }
        </StyledWrapper>
    );
};
