import React from 'react';
import styled, { keyframes } from 'styled-components';

import { getColor, LightnessLevel } from '../../theme';

const StyledWrapper = styled.div<{ width: number }>`
    width: 100%;
    aspect-ratio: 1;

    position: relative;

    & * {
        border-width: ${({ width }) => width}px;
    }
`;

const StyledCircle = styled.div`
    aspect-ratio: 1;
    border-radius: 50%;
    border-style: solid;
    border-color: transparent;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const animateCircle = keyframes`
    100% {
        transform: translate(-50%, -50%) rotate(360deg)
    }
`;

const StyledInnerCircle = styled(StyledCircle)`
    border-top-color: ${getColor('main', { lightnessOffset: LightnessLevel.Lighter3 })};
    animation: ${animateCircle} 1s linear infinite;
    width: 50%;
`;

const StyledMiddleCircle = styled(StyledCircle)`
    border-top-color: ${getColor('main', { lightnessOffset: LightnessLevel.Lighter2 })};
    animation: ${animateCircle} 2s linear infinite;
    width: 70%;
`;

const StyledOuterCircle = styled(StyledCircle)`
    border-top-color: ${getColor('main')};
    animation: ${animateCircle} 3s linear infinite;
    width: 90%;
`;

export const Loader = () =>  {
    const [width, setWidth] = React.useState(0);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (wrapperRef?.current) {
            const wrapperWidth = wrapperRef.current.getBoundingClientRect().width;
            setWidth(wrapperWidth / 40);
        }
    }, [wrapperRef]);

    return (
        <StyledWrapper ref={wrapperRef} width={width}>
            <StyledInnerCircle />
            <StyledMiddleCircle />
            <StyledOuterCircle />
        </StyledWrapper>
    );
};
