import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

import { LoginPage } from '../../pages/LoginPage';
import { MainPage } from '../../pages/MainPage';
import { PageNotFound } from '../../components/PageNotFound/PageNotFound';

export const appRoutes = (isLogged: boolean): RouteObject[] => [
    {
        path: '*',
        element: <PageNotFound />,
    },
    {
        path: '/',
        element: isLogged ? <Navigate to='/app' /> : <Navigate to='login' />,
    },
    {
        path: '/login',
        element: isLogged ? <Navigate to='/app' /> : <LoginPage />,
    },
    {
        path: '/app',
        element: isLogged ? <MainPage /> : <Navigate to='/login' />,
    },
];
