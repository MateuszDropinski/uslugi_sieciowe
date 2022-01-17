import styled, { css } from 'styled-components';

import { getColor, getFontColor, getFontFamily, getFontSize, LightnessLevel } from '../../theme';
import { Icon } from '../Icon';

const getInputBackgroundColor = (disabled, error) => {
    if (disabled) {
        return getColor('grey', { lightnessOffset: LightnessLevel.Darker3 });
    }

    return error
        ? getColor('red', { lightnessOffset: LightnessLevel.Lighter4 })
        : getColor('background');
};

export const StyledIcon = styled(Icon)<{ onClick: () => void }>`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);

    transition: .25s;
    cursor: ${({ onClick }) => onClick ? 'pointer' : 'default'};

    color: ${getFontColor('secondaryDark')};
`;

export const StyledInputWrapper = styled.div`
    position: relative;
`;

const StyledInputBase = css<{ error: boolean; disabled: boolean }>`
    width: 100%;
    border: 1px solid ${({ error }) => error ? getColor('red') : getFontColor('secondaryDark')};
    border-radius: 5px;
    background: ${({ disabled, error }) => getInputBackgroundColor(disabled, error)};

    outline: none;
    transition: border .25s;

    text-overflow: ellipsis;
    color: ${getFontColor('primaryDark')};
    font-size: ${getFontSize('caption')};
    font-family: ${getFontFamily('main')};

    &:focus {
        border-color: ${getColor('main', { lightnessOffset: LightnessLevel.Darker2 })};

        &+.${StyledIcon} {
            color: ${getColor('main', { lightnessOffset: LightnessLevel.Darker2 })};
        }
    }
`;

export const StyledInput = styled.input<{ additionalPadding: string; error: boolean; disabled: boolean }>`
    ${StyledInputBase};

    padding: ${({ additionalPadding }) => `.5rem calc(1rem + ${additionalPadding}) .5rem 1rem`};
`;

export const StyledTextarea = styled.textarea<{ error: boolean; disabled: boolean }>`
    ${StyledInputBase};

    padding: .5rem;
`;

export const StyledWrapper = styled.div<{ disabled: boolean }>`
    display: flex;
    flex-direction: column;
    gap: .3rem;

    position: relative;

    pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};

    &:hover {
        & ${StyledInput} {
            border-color: ${getColor('main')};
        }
        & ${StyledIcon} {
            color: ${getColor('main')} !important;
        }
    }
`;

export const StyledLabel = styled.div`
    font-size: ${getFontSize('caption')};
    color: ${getFontColor('secondaryDark')};
`;

export const StyledError = styled.div`
    font-size: ${getFontSize('caption')};
    color: ${getColor('red')};
`;
