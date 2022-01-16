import serviceAccount from './firebase-account';

describe('firebase-account', () => {
    it('Returns an object when executed', () => {
        const account = serviceAccount();

        expect(account).toMatchObject({
            projectId: undefined,
            privateKey: undefined,
            clientEmail: undefined
        });
    })
})