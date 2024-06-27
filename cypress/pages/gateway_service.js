class GatewayServicePage {
    constructor(base_url, workspace) {
        this.base_url = base_url
        this.workspace = workspace
        this.url = base_url +"/"+ workspace  + "/services"
        this.title = "Gateway Services"
    }
    visit() {
        console.log(this.url)
        cy.visit(this.url)
    }

    waitForGatewayServiceTable() {
      this.visit()
      cy.title().should('include', this.title)
      // wait for table to load
      cy.get('.k-table-container',{ timeout: 10000 }).should('be.visible');
    }
  
    newGatewayService(paras) {
        this.waitForGatewayServiceTable()
        // click on the "New Gateway Service" button
        cy.get('[data-testid$="-gateway-service"]').filter(':visible').click()
        // handle general information input
        if ("info" in paras){
          this.fillField(paras.info)
        }
        // handle endpoint input
        if ("endpoint" in paras){
          let endpoint_paras = paras.endpoint
          if ("url" in endpoint_paras) {
            cy.get('[data-testid="gateway-service-url-radio"]').scrollIntoView().check()
          }else{
            cy.get('[data-testid="gateway-service-protocol-radio"]').scrollIntoView().check()
          }
          this.fillField(endpoint_paras)
        }else{
          assert.fail("endpoint parameter is required")
        }
        // handle advanced fields input
        if ("advanced" in paras){
          // collapse advanced options
          cy.get('[data-testid="collapse-trigger-content"]').scrollIntoView().click()
          this.fillField(paras.advanced)
        }
        
        // submit the form
        cy.get('[data-testid="form-submit"]').click()
    }

    fillField(paras){
      for (let key in paras) {
        if (paras.hasOwnProperty(key)) {
          if (key === "tls-verify"){
            cy.get('[data-testid="gateway-service-tls-verify-checkbox"]').check()
            if (paras[key] === true){
              cy.get('[data-testid="gateway-service-tls-verify-true-option"]').check()
            }else{
              cy.get('[data-testid="gateway-service-tls-verify-false-option"]').check()
            }
          }else{
            cy.get(`[data-testid="gateway-service-${key}-input"]`).then($element => {
              if ($element.is(':visible')){
                  cy.get(`[data-testid="gateway-service-${key}-input"]`).focus().clear().type(paras[key])
              } 
            });
        }
      }
      }
    }

    deleteGatewayService(name) {
      // @todo implement delete gateway service
        
    }

}

export default GatewayServicePage