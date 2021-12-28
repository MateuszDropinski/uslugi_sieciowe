import * as _ from 'lodash/fp';

import { ColorOptions } from '../types';

const createHsla = (h: number, s: number, l: number, a: number): string => `hsl(${h},${s}%,${l}%,${a})`;

const getValues = (hsla: string): { h: number, s: number, l: number, a: number } => {
    const [h, s, l, a] = hsla.substr(4).split(')')[0].split(',');
    return {
        h: parseInt(h),
        s: parseInt(s),
        l: parseInt(l),
        a: parseInt(a),
    };
};

const gradientModifier = (hsla: string) => {
    const { h, s, l, a } = getValues(hsla);
    const distance = 10;
    const firstH = h - distance < 0 ? 360 - (distance - h) : h - distance;
    const secondH = h + distance > 360 ? 360 - h : h + distance;
    const firstL = l + distance < 0 ? 0 : l + distance;
    const secondL = l - distance > 100 ? 100 : l - distance;
    const firstColor = createHsla(firstH, s, firstL, a);
    const secondColor = createHsla(secondH, s, secondL, a);

    return `linear-gradient(to bottom right, ${firstColor}, ${secondColor})`;
};

const opacityModifier = _.curry((options: ColorOptions, hsla: string) => {
    const { h, s, l } = getValues(hsla);
    return createHsla(h, s, l, options.opacity);
});

const lightnessModifier = _.curry((options: ColorOptions, hsla: string) => {
    if (!options.lightnessOffset) {
        return hsla;

    }
    const { h, s, l, a } = getValues(hsla);
    return createHsla(h, s, _.clamp(0, 100)(l + options.lightnessOffset), a);
});

const defaultOptions: ColorOptions = {
    gradient: false,
    lightnessOffset: 0,
    opacity: 1,
};

export const modifyColor = _.curry((
    customOptions: ColorOptions,
    hsla: string
) => {
    const options = { ...defaultOptions, ...customOptions };

    return _.flowRight(
        (hsla) => options.gradient ? gradientModifier(hsla) : hsla,
        opacityModifier(options),
        lightnessModifier(options)
    )(hsla);
});
