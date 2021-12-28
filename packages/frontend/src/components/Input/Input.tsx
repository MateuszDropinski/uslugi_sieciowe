import React from 'react';
import * as _ from 'lodash/fp';

import { IconName, IconSize, iconSizes } from '../Icon';
import { StyledWrapper, StyledInput, StyledIcon, StyledLabel } from './Input.styles';

type Props<T extends string | number> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    value?: T;
    onChange: ((val: T) => void) | React.Dispatch<React.SetStateAction<T>>;
    onClick?: () => void;
    onBlur?: (val: T) => void;
    icon?: IconName;
    iconSize?: IconSize;
    onIconClick?: () => void;
    label?: string;
    min?: number;
    max?: number;
    selectOnFocus?: boolean;
}

export const Input = <T extends string | number>({
    className,
    onChange,
    onClick,
    value,
    icon,
    iconSize = 'sm',
    onIconClick,
    disabled = false,
    label,
    min,
    max,
    selectOnFocus = false,
    ...props
}: Props<T>) => {
    const [stateValue, setStateValue] = React.useState<string>('');

    const getTypedValue = (valueToType: string | number): T =>
        (props.type === 'number' ? Number(valueToType) : `${valueToType}`) as T;

    React.useEffect(() => {
        !_.isUndefined(value) && setStateValue(`${value}`);
    }, [value]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const typedValue = getTypedValue(e.target.value);
        setStateValue(e.target.value);
        onChange(typedValue);
    };

    const getValueBetween = (val: number) => Math.max(min ?? val, Math.min(max ?? val, val));

    const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const properValue = props.type === 'number'
            ? getTypedValue(getValueBetween(Number(e.target.value)))
            : getTypedValue(e.target.value);
        setStateValue(`${properValue}`);
        props.onBlur?.(properValue);
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        props.onFocus?.(e);
        if (selectOnFocus) {
            // It needs to run after first useEffect which sets state depending on prop
            setTimeout(() => e.target.select());
        }
    };

    return (
        <StyledWrapper
            onClick={onClick}
            disabled={disabled}
            className={className}>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledInput
                {...props}
                onFocus={handleOnFocus}
                disabled={disabled}
                value={stateValue}
                title={`${stateValue}`}
                additionalPadding={icon ? iconSizes[iconSize] : '0px' }
                onBlur={handleOnBlur}
                onChange={handleOnChange} />
            {
                icon && (
                    <StyledIcon
                        onClick={onIconClick}
                        name={icon}
                        size={iconSize} />
                )
            }
        </StyledWrapper>
    );
};
