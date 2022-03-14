///  <reference types="cypress"/>

describe('Política de privacidade', () => {

    beforeEach(() => {
        cy.visit('src/privacy.html')
    });

    Cypress._.times(10, function () {

        it('testa a página da política de privavidade de forma independente', () => {

            cy.get('h1').should('have.text', 'CAC TAT - Política de privacidade')
            cy.contains('Talking About Testing').should('be.visible')

        });

    })

});