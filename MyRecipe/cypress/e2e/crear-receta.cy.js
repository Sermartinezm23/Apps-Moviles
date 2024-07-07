describe('Crear Receta Page', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[formControlName="username"]').type('Hugo23');
      cy.get('input[formControlName="password"]').type('1234');
      cy.get('form').submit();
      cy.url().should('include', '/tabs/mis-recetas');
      
      cy.visit('/crear-receta');
    });
  
    it('should create a new recipe', () => {
      cy.get('input[formControlName="recipeName"]').type('Pizza');
      cy.get('input[formControlName="ingredient0"]').type('Harina');
      cy.get('input[formControlName="ingredient1"]').type('Agua');
      cy.get('input[formControlName="ingredient2"]').type('Sal');
      cy.get('form').submit();
      
      cy.url().should('include', '/tabs/mis-recetas');
    });
  });
  