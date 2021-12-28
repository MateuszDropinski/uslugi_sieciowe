import * as _ from 'lodash/fp';
import { FirebaseApp } from 'firebase/app';
import { getDatabase, ref as refFirebase, onValue, off, Database, set } from 'firebase/database';

export const firebaseDatabaseInterface = (() => {
    let listeners = {};
    let firebaseDatabase: Database;

    const init = (firebaseApp: FirebaseApp) => firebaseDatabase = getDatabase(firebaseApp);

    const unsubscribeListener = (key: string) => {
        if (listeners[key]) {
            listeners[key]();
            listeners = _.omit(['key'])(listeners);
        }
    };

    const destroy = () => _.forEach(unsubscribeListener)(_.keys(listeners));

    const subscribeValue = (ref: string, callback: (data: any) => void): string => {
        const key = `${ref}@value`;
        const databaseRef = refFirebase(firebaseDatabase, ref);
        const listener = onValue(databaseRef, (data) => callback(data.val()));

        if (!listeners[key]) {
            listeners = { ...listeners, [key]: () => off(databaseRef, 'value', listener) };
        }

        return key;
    };

    const setValue = async (ref: string, data: any) => {
        const databaseRef = refFirebase(firebaseDatabase, ref);
        return await set(databaseRef, data) as any;
    };

    return ({
        init,
        destroy,
        methods: {
            subscribeValue,
            unsubscribeListener,
            setValue,
        },
    });
})();
