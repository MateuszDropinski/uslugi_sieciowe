import * as _ from 'lodash/fp';

import { Theme, theme } from '../theme';
import { Color, ColorOptions } from '../types';
import { modifyColor } from './modifyColor';

const getTheme = (props: { theme: Theme }): Theme => props.theme;

const getFonts = _.flowRight(_.get('fonts'), getTheme);

export const getColor = (
    key: Color,
    options?: ColorOptions
) => _.flowRight(
    modifyColor(options),
    _.get(`colors.${key}`),
    getTheme
);

export const getFontFamily = (key: keyof typeof theme.fonts.families) =>
    _.flowRight(_.get(`families.${key}`), getFonts);

export const getFontColor = (key: keyof typeof theme.fonts.colors) =>
    _.flowRight(_.get(`colors.${key}`), getFonts);

export const getFontSize = (key: keyof typeof theme.fonts.sizes) =>
    _.flowRight(_.get(`sizes.${key}`), getFonts);
