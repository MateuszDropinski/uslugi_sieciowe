import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../store/hooks';
import { usersDataWithoutCurrentSelector } from '../../store/users/selectors';
import { getElevation, getFontSize } from '../../theme';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    overflow: auto;
    padding: 2rem;
    width: 25%;
    height: 100%;
    box-shadow: ${getElevation(12)};
`;

const StyledUser = styled.div`
    padding: 1rem;
    width: 100%;
    border-radius: 3px;

    cursor: pointer;
    transition: .25s;
    box-shadow: ${getElevation(3)};

    text-align: center;
    font-weight: bold;
    font-size: ${getFontSize('normal')};

    &:hover {
        box-shadow: ${getElevation(6)};
    }
`;

export const Sidebar = () => {
    const users = useAppSelector(usersDataWithoutCurrentSelector);
    console.log(users);

    return (
        <StyledWrapper>
            {
                users.map(({ name, email }) => <StyledUser key={email}>{name}</StyledUser>)
            }
        </StyledWrapper>
    );
};
