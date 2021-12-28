import { initializeApp, deleteApp, FirebaseApp } from 'firebase/app';

import { firebaseConfig } from './firebaseConfig';
import { firebaseAuthInterface } from './firebaseAuthInterface';
import { firebaseDatabaseInterface } from './firebaseDatabaseInterface';

export const firebaseInterface = (() => {
    let firebaseApp: FirebaseApp;

    const init = () => {
        firebaseApp = initializeApp(firebaseConfig);
        firebaseAuthInterface.init(firebaseApp);
        firebaseDatabaseInterface.init(firebaseApp);
    };

    const destroy = async () => {
        firebaseAuthInterface.destroy();
        firebaseDatabaseInterface.destroy();
        await deleteApp(firebaseApp);
        firebaseApp = null;
    };

    return {
        init,
        destroy,
        ...firebaseAuthInterface.methods,
        ...firebaseDatabaseInterface.methods,
    };
})();
