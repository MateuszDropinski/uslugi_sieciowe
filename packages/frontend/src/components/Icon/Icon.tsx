import React from 'react';
import styled from 'styled-components';

import { IconName, icons, IconSize, iconSizes } from './consts';

const Wrapper = styled.div<{ size: string }>`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${({ size }) => size};
`;

type Props = {
    name: IconName,
    size?: IconSize,
    className?: string,
    onClick?: () => void,
}

export const Icon: React.FC<Props> = ({
    name,
    size = 'md',
    className,
    onClick,
}) => {
    const ChosenIcon = icons[name];

    return (
        <Wrapper
            className={className}
            onClick={onClick}
            size={iconSizes[size]}>
            <ChosenIcon  />
        </Wrapper>
    );
};
