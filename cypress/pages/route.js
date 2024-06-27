class RoutePage {
    constructor(base_url, workspace) {
        this.base_url = base_url
        this.workspace = workspace
        this.url = base_url +"/"+ workspace  + "/routes"
        this.title = "Routes"
    }
    visit() {
        console.log(this.url)
        cy.visit(this.url)
    }

    waitForRouteTable() {
        this.visit()
        cy.title().should('include', this.title)
        // wait for table to load
        cy.get('.k-table-container',{ timeout: 10000 }).should('be.visible');
    }

    newRoute(paras){
        this.waitForRouteTable()
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

    deleteRoute(route_name) {
        // @todo: implement delete route
    }

}

export default RoutePage