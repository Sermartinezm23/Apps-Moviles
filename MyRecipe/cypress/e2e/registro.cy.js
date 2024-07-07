describe('Registro Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8100/registro');
    });
  
    it('should register a new user', () => {
      cy.get('input[formControlName="firstName"]', { timeout: 10000 }).should('be.visible');
  
      cy.get('input[formControlName="firstName"]').type('Hugo');
      cy.get('input[formControlName="lastName"]').type('Alvarez');
      cy.get('input[formControlName="birthDate"]').type('1990-01-01');
      cy.get('input[formControlName="username"]').type('Hugo23');
      cy.get('input[formControlName="password"]').type('1234');
      cy.get('input[formControlName="confirmPassword"]').type('1234');
      cy.get('form').submit();
  
      cy.url().should('include', '/login');
    });
  });  