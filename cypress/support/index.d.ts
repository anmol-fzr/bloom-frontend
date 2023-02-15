declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    uiLogin(email: string, password: string): Chainable<Element>;
    uiLogout(): Chainable<Element>;
    createAccessCode(accessCode: {
      featureLiveChat: boolean;
      featureTherapy: boolean;
      therapySessionsRemaining: number;
      therapySessionsRedeemed: number;
    }): Chainable<any>;
    deleteUser(email: string): Chainable<Element>;
    deleteAccessCode(): Chainable<Element>;
    getAccessCode(): Chainable<Element>;
    getAuthEmail(): Chainable<Element>;
    clearUserState(): Chainable<Element>;
    logInWithEmailAndPassword(email: string, password: string): Chainable<Element>;
    logout(): Chainable<Element>;
    deleteAllCypressUsers(): Chainable<Element>;
    cleanUpTestState(): Chainable<Element>;
  }
}