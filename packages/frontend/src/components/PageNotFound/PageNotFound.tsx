import React from 'react';
import styled from 'styled-components';

import { getFontSize } from '../../theme';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    padding: 2rem;
`;

const NoInfo = styled.div`
    font-size: ${getFontSize('h3')};
`;

export const PageNotFound = () => (
    <Wrapper>
        <NoInfo>Page not found</NoInfo>
    </Wrapper>
);
