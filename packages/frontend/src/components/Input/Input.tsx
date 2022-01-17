import React from 'react';
import * as _ from 'lodash/fp';

import { IconName, IconSize, iconSizes } from '../Icon';
import { StyledWrapper, StyledTextarea, StyledInput, StyledIcon, StyledLabel, StyledInputWrapper, StyledError } from './Input.styles';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'onChange' | 'type'> & {
    value?: string;
    onChange: ((val: string) => void) | React.Dispatch<React.SetStateAction<string>>;
    onClick?: () => void;
    onBlur?: (val: string) => void;
    icon?: IconName;
    iconSize?: IconSize;
    onIconClick?: () => void;
    label?: string;
    selectOnFocus?: boolean;
    error?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea'
}

export const Input = ({
    className,
    onChange,
    onClick,
    value,
    icon,
    iconSize = 'sm',
    onIconClick,
    disabled = false,
    label,
    selectOnFocus = false,
    error,
    type,
    ...props
}: Props) => {
    const [stateValue, setStateValue] = React.useState<string>('');

    React.useEffect(() => {
        !_.isUndefined(value) && setStateValue(`${value}`);
    }, [value]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStateValue(e.target.value);
        onChange(e.target.value);
    };

    const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStateValue(e.target.value);
        props.onBlur?.(e.target.value);
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.onFocus?.(e);
        if (selectOnFocus) {
            // It needs to run after first useEffect which sets state depending on prop
            setTimeout(() => e.target.select());
        }
    };

    const inputBaseProps = {
        ...props,
        error: !!error,
        onFocus: handleOnFocus,
        disabled,
        value: stateValue,
        title: stateValue,
        onBlur: handleOnBlur,
        onChange: handleOnChange,
    };

    return (
        <StyledWrapper
            onClick={onClick}
            disabled={disabled}
            className={className}>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledInputWrapper>
                {
                    type === 'textarea'
                        ? (<StyledTextarea {...inputBaseProps} />)
                        : (
                            <StyledInput {...inputBaseProps}
                                type={type}
                                additionalPadding={icon ? iconSizes[iconSize] : '0px' } />
                        )
                }
                {
                    icon && type !== 'textarea' && (
                        <StyledIcon
                            onClick={onIconClick}
                            name={icon}
                            size={iconSize} />
                    )
                }
            </StyledInputWrapper>
            {error && <StyledError>{error}</StyledError>}
        </StyledWrapper>
    );
};
