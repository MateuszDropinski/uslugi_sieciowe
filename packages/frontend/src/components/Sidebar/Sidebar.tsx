import React from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { usersDataWithoutCurrentSelector } from '../../store/users/selectors';
import { getColor, getElevation, getFontSize, LightnessLevel } from '../../theme';
import { messagesActiveUserSelector } from '../../store/messages/selectors';
import { setActiveUser } from '../../store/messages/slice';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    overflow: auto;
    padding: 2rem;
    width: 25%;
    height: 100%;
    box-shadow: ${getElevation(12)};

    font-size: ${getFontSize('h3')};
`;

const StyledUser = styled.div<{ isActive: boolean }>`
    padding: 1rem;
    width: 100%;
    border-radius: 3px;

    cursor: pointer;
    transition: .25s;
    box-shadow: ${getElevation(3)};
    background-color: ${({ isActive }) =>
        getColor(isActive ? 'main' : 'background', { lightnessOffset: LightnessLevel.Lighter3 })};

    text-align: center;
    font-weight: bold;
    font-size: ${getFontSize('normal')};

    &:hover {
        box-shadow: ${getElevation(6)};
    }
`;

export const Sidebar = () => {
    const dispatch = useAppDispatch();

    const users = useAppSelector(usersDataWithoutCurrentSelector);
    const activeUser = useAppSelector(messagesActiveUserSelector);

    const onClick = (email) => dispatch(setActiveUser(email));

    return (
        <StyledWrapper>
            <div>Users:</div>
            {
                users.map(({ name, email }) => (
                    <StyledUser
                        key={email}
                        onClick={() => onClick(email)}
                        isActive={email === activeUser}>
                        {name}
                    </StyledUser>
                ))
            }
        </StyledWrapper>
    );
};
