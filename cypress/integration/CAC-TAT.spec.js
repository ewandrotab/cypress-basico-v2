///  <reference types="cypress"/>

describe('Central de Atendimento ao Cliente TAT', () => {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        
        cy.visit('src/index.html')
    });
    it('verifica o título da aplicação', () => {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        
        cy.clock()

        cy.get('input[name=firstName]').should('be.visible').type('Ewandro Luiz')        
        cy.get('input[name=lastName]').should('be.visible').type('Taborda')
        cy.get('#email').should('be.visible').type('ewandro.taborda@teste.com')
        cy.get('#open-text-area').should('be.visible').type('Poderiam me ensinar como utilizar o Cypress?', {delay: 30})
        
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible').find('strong').should('have.text', 'Mensagem enviada com sucesso.')
        
        cy.tick(THREE_SECONDS_IN_MS)
        
        cy.get('.success').should('not.be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        
        cy.clock()
        
        cy.get('input[name=firstName]').should('be.visible').type('Ewandro Luiz')        
        cy.get('input[name=lastName]').should('be.visible').type('Taborda')
        cy.get('#email').should('be.visible').type('ewandro.taborda.com')
        cy.get('#open-text-area').should('be.visible').type('Poderiam me ensinar como utilizar o Cypress?', {delay: 0})
        
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible').find('strong').should('have.text', 'Valide os campos obrigatórios!')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    });
    
    Cypress._.times(5, function () {

        it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
            cy.get('#phone').type('abcdef').should('have.value', '')
        });

    })
    

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        
        cy.clock()

        cy.get('input[name=firstName]').should('be.visible').type('Ewandro Luiz')        
        cy.get('input[name=lastName]').should('be.visible').type('Taborda')
        cy.get('#email').should('be.visible').type('ewandro.taborda@empresa.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').should('be.visible').type('Poderiam me ensinar como utilizar o Cypress?', {delay: 0})
        
        cy.contains('button', 'Enviar').click()        

        cy.get('.error').should('be.visible').find('strong').should('have.text', 'Valide os campos obrigatórios!')
        
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        
        cy.get('input[name=firstName]')
            .should('be.visible')
            .type('Ewandro Luiz')
            .should('have.value', 'Ewandro Luiz')
            .clear()
            .should('have.value', '')

        
        cy.get('input[name=lastName]')
            .should('be.visible')
            .type('Taborda')
            .should('have.value', 'Taborda')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .should('be.visible')
            .type('ewandro.taborda@teste.com')
            .should('have.value', 'ewandro.taborda@teste.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .should('be.visible')
            .type('1234567890', {delay: 0})
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
        
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        
        cy.clock()
        
        cy.contains('button', 'Enviar').click()        

        cy.get('.error').should('be.visible').find('strong').should('have.text', 'Valide os campos obrigatórios!')
        
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        
        cy.clock()
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible').find('strong').should('have.text', 'Mensagem enviada com sucesso.')
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {

        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
        
    });

    it('seleciona um produto (Blog) por seu índice', () => {

        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
        
    });

    it('marca o tipo de atendimento "Feedback"', () => {

        cy.get('input[type=radio][value=feedback]')
            .check()
            .should('be.checked')
            .and('have.value', 'feedback')
        
    });

    it('marca cada tipo de atendimento', () => {

        cy.get('input[type=radio]')
            .should('have.length', 3)           
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
        
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {

        cy.get('input[type=checkbox]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')                
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')                
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        
        cy.fixture('example.json').as('sampleFile')

        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')                
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')

    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        
        cy.get('a[href="privacy.html"]').as('link')
        cy.get('@link')
            .invoke('removeAttr', 'target')
            .click()

        cy.get('h1').should('have.text', 'CAC TAT - Política de privacidade')

    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it('preenche a area de texto usando o comando invoke', () => {
        
        const longText = Cypress._.repeat('0123456789', 20)
        
        //cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
        cy.get('#open-text-area').type(longText).should('have.value', longText)
    });

    it('encontra o gato escondido', () => {
        cy.get('#cat')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')          
          
        cy.get('#title')
          .invoke('text', 'CAT TAT')

        cy.get('#subtitle')
          .invoke('text', 'Eu 💚 gatos!!!')
      })
    
});
