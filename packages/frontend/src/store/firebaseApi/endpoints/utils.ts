import { firebaseInterface } from '../../../firebase/firebaseInterface';

export const getEmailKey = () => firebaseInterface.getCurrentUser().email.split('.').join('_');
