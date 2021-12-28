import {
    IoLogOutOutline,
    IoLogInOutline,
    IoArrowDownOutline,
    IoClose,
    IoWarningOutline,
    IoInformationCircleOutline,
    IoCheckmarkCircleOutline,
    IoArrowBackOutline,
    IoArrowForwardOutline,
    IoSettingsSharp,
} from 'react-icons/io5';
import { FiCheck } from 'react-icons/fi';
import { FaPen } from 'react-icons/fa';
import { BiBell, BiCake, BiErrorCircle, BiTask } from 'react-icons/bi';
import { MdMoreTime } from 'react-icons/md';

export const icons = {
    pen: FaPen,
    signOut: IoLogOutOutline,
    signIn: IoLogInOutline,
    arrowDown: IoArrowDownOutline,
    arrowLeft: IoArrowBackOutline,
    arrowRight: IoArrowForwardOutline,
    x: IoClose,
    check: FiCheck,
    warning: IoWarningOutline,
    info: IoInformationCircleOutline,
    success: IoCheckmarkCircleOutline,
    error: BiErrorCircle,
    bell: BiBell,
    cake: BiCake,
    task: BiTask,
    settings: IoSettingsSharp,
    addTime: MdMoreTime,
};

export type IconName = keyof typeof icons;

export const iconSizes = {
    xl: '4rem',
    lg: '3.2rem',
    md: '2.4rem',
    sm: '1.6rem',
    xs: '1.2rem',
};

export type IconSize = keyof typeof iconSizes;
