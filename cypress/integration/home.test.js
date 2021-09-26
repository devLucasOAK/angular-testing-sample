describe('Home Page',() => {

    beforeEach('', () => {

        cy.fixture('courses.json').as('coursesJSON')

        cy.server(); //Initialize server first to simulate http calls
        cy.route('/api/courses', '@coursesJSON').as('courses')

        cy.visit('/');
        
    })
    
    it('should display a list of all courses', () => {

        cy.contains('All Courses') //assertion

        cy.wait('@courses') //Wait for courses to be rendered
        cy.get('mat-card').should('have.length', 9);//assertion
        
    })

    it('should display a list of advanced courses', () => {

        cy.get('.mat-tab-label').should('have.length', 2) //2 tab buttons
        cy.get('.mat-tab-label').last().click() //Simulate click on the second tab
        
        //assertions
        cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1)
        cy.get('.mat-tab-body-active .mat-card-title').first().should('contain', 'Angular Security Course')
        
    })
})