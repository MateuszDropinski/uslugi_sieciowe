import React from 'react';
import styled from 'styled-components';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useSetUserDataMutation } from '../../store/firebaseApi/endpoints/users';
import { getColor } from '../../theme';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    background-color: ${getColor('background')};
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 2rem;
`;

export const UserData = () => {
    const [setUserData] = useSetUserDataMutation();
    const [name, setName] = React.useState('');

    const onClick = () => setUserData(name);

    return (
        <StyledWrapper>
            <Input
                autoFocus
                label="Przed przejściem dalej podaj swoją nazwę"
                onChange={setName}
                value={name} />
            <Button label='Zapisz nazwę' icon='check' onClick={onClick} />
        </StyledWrapper>
    );
};
