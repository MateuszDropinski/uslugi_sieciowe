import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from './store/StoreProvider';
import { firebaseInterface } from './firebase/firebaseInterface';
import { AppRouter } from './routers/AppRouter/AppRouter';
import { ThemeProvider } from './theme';

export const App = () => {
    const [isInitialized, setIsInitialized] = React.useState<boolean>(false);

    React.useEffect(() => {
        firebaseInterface.init();
        setIsInitialized(true);

        return () => {
            firebaseInterface.destroy();
        };
    }, []);

    return (
        <StoreProvider>
            <BrowserRouter>
                <ThemeProvider>
                    { isInitialized && <AppRouter /> }
                </ThemeProvider>
            </BrowserRouter>
        </StoreProvider>
    );
};
