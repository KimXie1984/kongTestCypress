class RoutePage {
    constructor(base_url, workspace) {
        this.base_url = base_url
        this.workspace = workspace
        this.url = base_url +"/"+ workspace  + "/routes"
        this.title = "Routes"
    }
    visit() {
        cy.visit(this.url)
        this.waitForRouteTable()
    }

    waitForRouteTable() {
        cy.title().should('include', this.title)
        // wait for table to load
        cy.get('.k-table-container', { timeout: 10000 }).scrollIntoView().should('be.visible');
    }

    newRoute(paras){
        console.log("Creating new route")
        this.visit()
        // click new route button
        cy.get('[data-testid$="-route"]').filter(':visible').click()
        // handle general information input
        this.fillField(paras)
        // submit the form
        cy.get('[data-testid="form-submit"]').click()
    }

    fillField(paras){
        for (let key in paras) {
            if (paras.hasOwnProperty(key)) {
              if (key === "service-id" || key === "protocols"){
                console.log(paras[key])
                cy.get(`[data-testid="route-form-${key}"]`).click()
                cy.get('.select-item-label').contains(paras[key]).click()
              }else{
                cy.get(`[data-testid="route-form-${key}"]`).then($element => {
                  if ($element.is(':visible')){
                      cy.get(`[data-testid="route-form-${key}"]`).focus().type(paras[key])
                  } 
                });
             }
          }
          }
    }

    deleteRoute() {
        this.visit()
        cy.get('body').then($body =>{
            if ($body.find('table').length === 0){
                console.log("Table doesn't exist")
            }else{
                console.log("Table exists")
                cy.get('table tbody tr').each(($row) => {
                    let name = $row.attr('data-testid')
                    // click ...
                    // cy.wrap($row).find('[data-testid="overflow-actions-button"]').click()
                    cy.wrap($row).find('[data-testid="overflow-actions-button"]').should('be.visible').click()
                    // click delete
                    cy.wrap($row).find('[data-testid="action-entity-delete"]').click()
                    // confirm name or id to delete
                    cy.get('[data-testid="confirmation-input"]').focus().clear().type(name)
                    cy.get('[data-testid="modal-action-button"]').click()
                    // after each delete, wait for table to load again
                    this.visit()
                })
            }
        })
    }

}

export default RoutePage