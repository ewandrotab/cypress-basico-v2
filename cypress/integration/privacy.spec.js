///  <reference types="cypress"/>

describe('Política de privacidade', () => {

    beforeEach(() => {
        cy.visit('src/privacy.html')
    });
    it('testa a página da política de privavidade de forma independente', () => {        
        
        cy.get('h1').should('have.text', 'CAC TAT - Política de privacidade')
        
    
    });
});
