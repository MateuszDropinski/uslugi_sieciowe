import styled from 'styled-components';
import {
    Color,
    getColor,
    getElevation,
    getFontColor,
    getFontFamily,
    getFontSize, LightnessLevel
} from '../../theme';

export const StyledPrimaryButton = styled.button<{ color: Color, disabled: boolean, hasLabel: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    border: 1px solid ${({ color }) => getColor(color)};
    background-color: ${({ color }) => getColor(color)};
    box-shadow: ${getElevation(2)};
    padding: ${({ hasLabel }) => hasLabel ? '.5rem 1rem' : '.5rem'};
    border-radius: 5px;
    outline: none;

    transition: .3s;
    cursor: pointer;
    pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
    user-select: none;

    color: ${getFontColor('primaryLight')};

    &:hover, &:focus {
        box-shadow: ${getElevation(6)};
    }
`;

export const StyledText = styled.span`
    line-height: 1;
    font-size: ${getFontSize('normal')};
    font-family: ${getFontFamily('main')};
    font-weight: 600;
`;

export const StyledSecondaryButton = styled(StyledPrimaryButton)<{ color: Color }>`
    background-color: ${getColor('background')};
    box-shadow: ${getElevation(1)};

    color: ${({ color }) => getColor(color)};

    &:hover, &:focus {
        background-color: ${getColor('background')};
        border: 1px solid ${({ color }) => getColor(color, { lightnessOffset: LightnessLevel.Lighter2 })};
    }
`;

export const StyledTertiaryButton = styled(StyledSecondaryButton)<{ color: Color }>`
    background-color: transparent;
    border: none;
    box-shadow: none;
    padding: 0;

    &:hover, &:focus {
        background-color: transparent;
        border: none;
        box-shadow: none;

        color: ${({ color }) =>
        getColor(
            color,
            {
                lightnessOffset: color === 'black'
                    ? LightnessLevel.Lighter4
                    : LightnessLevel.Lighter3,
            }
        )};
    }
`;
