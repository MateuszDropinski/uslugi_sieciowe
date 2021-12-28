import { theme } from './theme';
import { LightnessLevel } from './utils';

export type ColorOptions = {
    gradient?: boolean,
    lightnessOffset?: LightnessLevel | 0,
    opacity?: number
}
export type Color = keyof typeof theme.colors;
