import React from 'react';

import { Icon, IconName, IconSize } from '../Icon';
import { StyledPrimaryButton, StyledSecondaryButton, StyledTertiaryButton, StyledText } from './Button.styles';
import { Color } from '../../theme';

const Buttons = {
    primary: StyledPrimaryButton,
    secondary: StyledSecondaryButton,
    tertiary: StyledTertiaryButton,
};

export type ButtonType = keyof typeof Buttons;

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    label?: string,
    type?: ButtonType,
    icon?: IconName,
    color?: Color,
    iconSize?: IconSize
};

export const Button = ({
    onClick,
    className,
    type = 'primary',
    color = 'main',
    icon,
    iconSize,
    label,
    disabled,
    ...props
}: Props) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const ButtonComponent = Buttons[type];

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        buttonRef.current.blur();
        onClick(event);
    };

    return (
        <ButtonComponent
            ref={buttonRef}
            {...props}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            color={disabled ? 'grey' : color}
            className={className}
            onClick={handleOnClick}
            hasLabel={!!label}>
            {label && <StyledText>{label}</StyledText> }
            {icon && <Icon name={icon} size={iconSize} />}
        </ButtonComponent>
    );
};
