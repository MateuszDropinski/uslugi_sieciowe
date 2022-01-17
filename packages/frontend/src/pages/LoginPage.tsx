import React from 'react';
import styled from 'styled-components';

import { useSignInMutation } from '../store/firebaseApi/endpoints/signIn';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 2rem;
`;

const StyledInput = styled(Input)`
    width: 30rem;
`;

export const LoginPage = () => {
    const [signIn] = useSignInMutation();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const onClick = () => signIn({ email, password });

    return (
        <StyledWrapper>
            <StyledContent>
                <StyledInput
                    autoFocus
                    label='E-mail'
                    onChange={setEmail}
                    value={email} />
                <StyledInput
                    label='Password'
                    type="password"
                    value={password}
                    onChange={setPassword} />
                <Button onClick={onClick} label='Zaloguj się' icon='signIn' />
            </StyledContent>
        </StyledWrapper>
    );
};
