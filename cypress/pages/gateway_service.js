import { should } from "chai"
import BasePage from "./base_page"


class GatewayServicePage extends BasePage {
    constructor(base_url, workspace) {
      super(base_url)
      this.workspace = workspace
      this.url = base_url +"/"+ workspace  + "/services"
      this.title = "Gateway Services"
    }


    // visit() {
    //   cy.visit(this.url)
    //   this.waitForGatewayServiceTable()
    //   cy.wait(1000)
    // }

    // waitForGatewayServiceTable() {
    //     cy.title().should('include', this.title)
    //     // wait for table to load
    //     cy.get('.k-table-container',{ timeout: 10000 }).scrollIntoView().should('be.visible');
    // }
  
    newGatewayService(paras) {
        console.log("Start to create gateway service")

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
        cy.on('window:alert',(t)=>{
          expect(t).to.contains('successfully created!');
        })
        console.log("Created gateway service")
    }

    fillField(paras){
      for (let key in paras) {
        if (paras.hasOwnProperty(key)) {
          if (key === "tls-verify"){
            cy.get('[data-testid="gateway-service-tls-verify-checkbox"]').scrollIntoView().check()
            if (paras[key] === true){
              cy.get('[data-testid="gateway-service-tls-verify-true-option"]').check()
            }else{
              cy.get('[data-testid="gateway-service-tls-verify-false-option"]').check()
            }
          }else if (key === "protocol"){
            cy.get(`[data-testid="gateway-service-${key}-select"]`).then($element => {
              if ($element.is(':visible')){
                $element.click()
                if (paras[key] === "http"){
                  cy.get('.selected > .select-item-label').click()
                }else{
                  cy.get(`[data-testid="select-item-${paras[key]}"] > .select-item-container > button > .select-item-label`).click()
                }
              } 
            });
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

    deleteGatewayService() {
      this.visit()
      cy.get('body').then($body =>{
          if ($body.find('table').length === 0){
              console.log("Gateway service table doesn't exist")
          }else{
              console.log("Gateway service table exists, start to delete gateway service")
              cy.get('table').find('tr',{timeout: this.timeout}).then((rows) => {
                console.log("Gateway service table has " + rows.length + " rows")
                for (let i = 0; i < rows.length; i++) {
                  if (rows[i].innerHTML.includes('k-table-header-name')){
                    console.log("Skip the header row")
                  }else{
                   this.performDeleteFirstRow()
                  }
                }
              })
          }
      })
    }

    performDeleteFirstRow() {
      this.visit()
      cy.get('table tbody tr').first().then(($row) => {
        let name = $row.attr('data-testid')
        console.log(`Start to delete gateway service ${name}`)
        // click ...
        cy.wrap($row).find('[data-testid="overflow-actions-button"]').click()
        // click delete
        cy.wrap($row).find('[data-testid="action-entity-delete"]').click()
        // confirm name or id to delete
        cy.get('[data-testid="confirmation-input"]').focus().clear().type(name)
        cy.get('[data-testid="modal-action-button"]').click()
        cy.on('window:alert',(t)=>{
          expect(t).to.contains('successfully deleted!');
        })
        console.log(`Deleted gateway service ${name}`)
      })
    }

    checkGatewayServiceCount(count) {
      this.checkTableRowsCount(count)
    }
}

export default GatewayServicePage