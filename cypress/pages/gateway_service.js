class GatewayServicePage {
    constructor(base_url, workspace) {
        this.base_url = base_url
        this.workspace = workspace
        this.url = base_url +"/"+ workspace  + "/services"
        this.title = "Gateway Services"
    }
    visit() {
        cy.visit(this.url)
        this.waitForGatewayServiceTable()
    }

    waitForGatewayServiceTable() {
        cy.title().should('include', this.title)
        // wait for table to load
        cy.get('.k-table-container',{ timeout: 10000 }).scrollIntoView().should('be.visible');
    }
  
    newGatewayService(paras) {
        this.visit()
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
      this.visit()
      cy.get('body').then($body =>{
          if ($body.find('table').length === 0){
              // table doesn't exist
          }else{
              // table exist
              cy.get('table tbody tr').each(($row) => {
                  let name = $row.attr('data-testid')
                  // click ...
                  cy.wrap($row).find('[data-testid="overflow-actions-button"]').click()
                  // click delete
                  cy.wrap($row).find('[data-testid="action-entity-delete"]').click()
                  // confirm name or id to delete
                  cy.get('[data-testid="confirmation-input"]').focus().clear().type(name)
                  cy.get('[data-testid="modal-action-button"]').click()
                  this.visit()
              })
          }
      })
  }


}

export default GatewayServicePage