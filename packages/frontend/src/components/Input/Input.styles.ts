import styled from 'styled-components';

import { getColor, getFontColor, getFontFamily, getFontSize, LightnessLevel } from '../../theme';
import { Icon } from '../Icon';

export const StyledIcon = styled(Icon)<{ onClick: () => void }>`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);

    transition: .25s;
    cursor: ${({ onClick }) => onClick ? 'pointer' : 'default'};

    color: ${getFontColor('secondaryDark')};
`;

export const StyledInput = styled.input<{ additionalPadding: string }>`
    width: 100%;
    padding: ${({ additionalPadding }) => `.5rem calc(1rem + ${additionalPadding}) .5rem 1rem`};
    border: 1px solid ${getFontColor('secondaryDark')};
    border-radius: 5px;
    background: ${({ disabled }) => disabled
        ? getColor('grey', { lightnessOffset: LightnessLevel.Darker3 })
        : getColor('background')};

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
