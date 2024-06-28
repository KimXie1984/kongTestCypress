import BasePage from "./base_page"


class RoutePage extends BasePage {
    constructor(base_url, workspace) {
        super(base_url)
        this.workspace = workspace
        this.url = base_url +"/"+ workspace  + "/routes"
        this.title = "Routes"
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
        cy.on('window:alert',(t)=>{
            expect(t).to.contains('successfully created!');
        })
    }

    fillField(paras){
        for (let key in paras) {
            if (paras.hasOwnProperty(key)) {
              if (key === "service-id" || key === "protocols"){
                console.log(paras[key])
                cy.get(`[data-testid="route-form-${key}"]`).click()
                cy.get('.select-item-label').contains(paras[key]).scrollIntoView().click()
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
                console.error("Route table doesn't exist ")
            }else{
                console.log("Route table exists, start to delete routes")
                cy.get('table tbody tr').each(($row) => {
                    let name = $row.attr('data-testid')
                    console.log(`Start to delete route ${name}`)
                    // click ...
                    // cy.wrap($row).find('[data-testid="overflow-actions-button"]').click()
                    cy.wrap($row).find('[data-testid="overflow-actions-button"]').should('be.visible').click()
                    // click delete
                    cy.wrap($row).find('[data-testid="action-entity-delete"]').click()
                    // confirm name or id to delete
                    cy.get('[data-testid="confirmation-input"]').focus().clear().type(name)
                    cy.get('[data-testid="modal-action-button"]').click()
                    cy.on('window:alert',(t)=>{
                        expect(t).to.contains('successfully deleted!');
                    })
                    console.log(`Deleted route ${name}`)
                    // after each delete, wait for table to load again
                    this.visit()
                })
            }
        })
    }

}

export default RoutePage