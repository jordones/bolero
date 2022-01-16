import admin from 'firebase-admin';
import serviceAccount from '../service-accounts/firebase-account';

export default () => {
    const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount())
    });

    return app.firestore();
};