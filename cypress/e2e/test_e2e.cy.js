/// <reference types="cypress" />

import GatewayServicePage from "../pages/gateway_service"
import RoutePage from "../pages/route"

const gatewayServicePage = new GatewayServicePage('http://localhost:8002', "default")
const routePage = new RoutePage('http://localhost:8002', "default")

context('kong e2e test', () => {
    beforeEach(() => {
      cy.fixture('gateway_services.json').as('gateway_services')
      routePage.deleteRoute()
      gatewayServicePage.deleteGatewayService()
    })
  
    Cypress._.times(1, () => {
      it.only('create 2 gateway services', () => {
        let count = 0
        cy.get('@gateway_services').then((gateway_services) => {
          let newGatewayServiceCalls = [];
          for (let gateway_service of gateway_services) {
            newGatewayServiceCalls.push(gatewayServicePage.newGatewayService(gateway_service));
            count += 1;
          }
          return Cypress.Promise.all(newGatewayServiceCalls);
        })
        .then(() => {
          gatewayServicePage.checkGatewayServiceCount(count);
        });
      })

      it.only('create a route associated with gateway service', () => {
        let service_id_name = "gateway-service"+ new Date().getTime()
        let paras = {
          info:{
            name: service_id_name,
            tags: "tag1,tag2",
          },
          endpoint:{
            url: 'http://test.com',
          },
        };
        gatewayServicePage.newGatewayService(paras)
        gatewayServicePage.checkTableRowsCount(1)
        paras={
          name: "route"+ new Date().getTime(),
          "service-id": service_id_name,
          tags: "tag1,tag2",
          protocols: "GRPC",
          "paths-input-1" : "/"
        }
        routePage.newRoute(paras)
        routePage.checkTableRowsCount(1)
      })
    })
})
  