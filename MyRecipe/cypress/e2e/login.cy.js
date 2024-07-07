describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8100/login');
    });
  
    it('should login a user', () => {
      cy.get('input[formControlName="username"]').type('Hugo23');
      cy.get('input[formControlName="password"]').type('1234');
      cy.get('form').submit();
      
      cy.url().should('include', '/tabs/mis-recetas');
    });
  });
  