import React from 'react';
import { createGlobalStyle, ThemeProvider as BaseThemeProvider } from 'styled-components';

import { Theme, theme } from './theme';
import { getColor, getFontColor, getFontFamily, LightnessLevel } from './utils';

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
    * {
        box-sizing: border-box;

        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        scrollbar-color: ${getColor('main')};
        scrollbar-width: thin;

        &::-webkit-scrollbar {
            width: 7px;
            height: 4px;
            margin-left: 5px;
            background-color: ${getColor('background')};
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${getColor('grey', { lightnessOffset: LightnessLevel.Darker4 })};
        }
    }

    html {
        font-size: 67.5%;
        height: 100%;
    }

    body {
        margin: 0;

        background: ${getColor('background')};

        color: ${getFontColor('primaryDark')};
        font-family: ${getFontFamily('main')};
    }

    #root {
        min-height: 100vh;
    }
`;

export const ThemeProvider: React.FC = ({ children }) => (
    <BaseThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
    </BaseThemeProvider>
);
