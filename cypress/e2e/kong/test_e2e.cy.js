/// <reference types="cypress" />
context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8002/')
      console.log(cy.title)
    })
  

    it.only('create a gateway service', () => {
      go_to_page_gateway_service()
      // click the default workspace)
      // cy.get('[data-testid="workspace-link-default"]').click()
      // cy.title().should('include', 'Overview')
      // // open side bar so that we can click "Gateway Service"
      // cy.get('.sidebar-menu-toggle').click()
      // // click "Gateway Services" in side bar
      cy.get('[data-testid="sidebar-item-gateway-services"]').click()
      cy.title().should('include', 'Gateway Services')
      // wait for table to load
      cy.get('.k-table-container',{ timeout: 10000 }).should('be.visible');
      cy.on("fail", (err, runnable) => {
        cy.log(err.message);
        return false;
      });
      cy.get('[data-testid="toolbar-add-gateway-service"]').click()
      cy.get('[data-testid="gateway-service-name-input"]').focus().type("test")
      cy.get('[data-testid="gateway-service-url-input"]').focus().type('http://localhost:8002')
      cy.get('[data-testid="form-submit"]').click()
    })

    it.only('create a route', () => {
      //
      go_to_page_gateway_service()
      cy.get('[data-testid="sidebar-item-routes"]').click()
      cy.title().should('include', 'Routes')
      cy.get('.k-table-container',{ timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="new-route"]').click()
      // cy.get('[data-testid="toolbar-add-route"]').click()
      cy.get('[data-testid="route-form-name"]').focus().type("test")
      cy.get('[data-testid="route-form-service-id"]').click()
    })

    function go_to_page_gateway_service() {
      // click the default workspace
      cy.get('[data-testid="workspace-link-default"]').click()
      cy.title().should('include', 'Overview')
      // open side bar so that we can click "Gateway Service"
      cy.get('.sidebar-menu-toggle').click()
    }
  })
  