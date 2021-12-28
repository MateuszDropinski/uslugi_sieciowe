import { FirebaseApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged as onAuthStateChangedFirebase,
    setPersistence,
    Auth,
    Unsubscribe,
    User,
    UserInfo,
    browserLocalPersistence,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
} from 'firebase/auth';

export const firebaseAuthInterface = (() => {
    let firebaseAuth: Auth;
    let onAuthStateChanged: Unsubscribe;

    const init = (firebaseApp: FirebaseApp) => firebaseAuth = getAuth(firebaseApp);

    const destroy = () => onAuthStateChanged && onAuthStateChanged();

    const signIn = async (email: string, password: string) => {
        await setPersistence(firebaseAuth, browserLocalPersistence);
        return await signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const signOut = () => signOutFirebase(firebaseAuth);

    const subscribeAuthStateChanged = (listener: (user: User) => void) => {
        onAuthStateChanged = onAuthStateChangedFirebase(firebaseAuth, listener);
    };

    const getCurrentUser = (): UserInfo | null | undefined =>
        onAuthStateChanged && (firebaseAuth.currentUser || null);

    const getUid = () => getCurrentUser().uid;

    return {
        init,
        destroy,
        methods: {
            signIn,
            signOut,
            subscribeAuthStateChanged,
            getCurrentUser,
            getUid,
        },
    };
})();
