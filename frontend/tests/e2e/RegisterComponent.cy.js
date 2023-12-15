describe('Register Component E2E Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/register');
    });

    it('Loads the register form', () => {
        cy.get('form').should('exist');
    });

    it('Accepts input', () => {
        const testEmail = 'test@example.com';
        const testPassword = 'password123';

        cy.get('input[type="email"]').type(testEmail).should('have.value', testEmail);
        cy.get('input[type="password"]').type(testPassword).should('have.value', testPassword);
    });
});
