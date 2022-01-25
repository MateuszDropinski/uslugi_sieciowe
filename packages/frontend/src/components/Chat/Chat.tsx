import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash/fp';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { getColor, getElevation, getFontSize, LightnessLevel } from '../../theme';
import { useAppSelector } from '../../store/hooks';
import {
    messagesActiveConversationSelector,
    messagesActiveUserSelector,
} from '../../store/messages/selectors';
import {
    useRemoveToxicityMutation,
    useSetMessageMutation,
} from '../../store/firebaseApi/endpoints/messages';
import { Message } from '../../store/messages/types';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    gap: 2rem;

    padding: 2rem;
`;

const Messages = styled.div`
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
    padding: 1rem;
    flex: 1;
    overflow: auto;
`;

const NewMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
`;

const StyledInput = styled(Input)`
    flex: 1;
    resize: none;

    & textarea {
        font-size: ${getFontSize('normal')};
    }
`;

const SelectUser = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    font-size: ${getFontSize('h3')};
`;

const StyledMessage = styled.div<{ isMine: boolean }>`
    display: flex;
    align-self: ${({ isMine }) => isMine ? 'flex-end' : 'flex-start'};
    max-width: 50%;
    padding: .5rem;

    border-radius: 6px;
    background: ${({ isMine }) =>
        getColor(isMine ? 'main' : 'background', { gradient: true, lightnessOffset: LightnessLevel.Lighter3 })};
    box-shadow: ${getElevation(2)};
    font-size: ${getFontSize('normal')};
`;

const ToxicMessage = styled.div`
    color: ${getColor('red')};
    text-decoration: underline;
    cursor: pointer;
`;

export const Chat = () => {
    const [setMessageMutation] = useSetMessageMutation();
    const [removeMessageToxicity] = useRemoveToxicityMutation();

    const [message, setMessage] = React.useState('');

    const activeUser = useAppSelector(messagesActiveUserSelector);
    const activeConversation = useAppSelector(messagesActiveConversationSelector);

    React.useEffect(() => {
        setMessage('');
    }, [activeUser]);

    const onClick = () => {
        setMessageMutation({ message, user: activeUser, dateKey: Date.now() });
        setMessage('');
    };

    const onToxicTextClick = (dateKey: number) => {
        removeMessageToxicity({ dateKey, user: activeUser });
    };

    if (!activeUser) {
        return (
            <StyledWrapper>
                <SelectUser>
                    Select one of the user
                </SelectUser>
            </StyledWrapper>
        );
    }

    return (
        <StyledWrapper>
            <Messages>
                {
                    _.flowRight(
                        _.map<Message, React.ReactElement>(({ key, value, mine, toxicity }) => (
                            <StyledMessage key={key} isMine={mine}>
                                {toxicity
                                    ? (
                                        <ToxicMessage onClick={() => onToxicTextClick(key)}>
                                            This message contains toxic text, click to show it.
                                        </ToxicMessage>
                                    )
                                    : value
                                }
                            </StyledMessage>
                        )),
                        _.reverse
                    )(activeConversation)
                }
            </Messages>
            <NewMessage>
                <StyledInput type='textarea' value={message} onEnter={onClick} onChange={setMessage} />
                <Button label='Send' icon='send' onClick={onClick} />
            </NewMessage>
        </StyledWrapper>
    );
};
