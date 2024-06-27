/// <reference types="cypress" />

import GatewayServicePage from "../pages/gateway_service"
import RoutePage from "../pages/route"

const gatewayServicePage = new GatewayServicePage('http://localhost:8002', "default")
const routePage = new RoutePage('http://localhost:8002', "default")

context('kong e2e test', () => {
    beforeEach(() => {
      routePage.deleteRoute()
      gatewayServicePage.deleteGatewayService()
    })
  

    it.only('create a gateway service', () => {
      let paras = {
        info:{
          name: "gateway-service"+ new Date().getTime(),
          tags: "tag1,tag2",
        },
        endpoint:{
          url: 'http://test.com',
        },
        advanced:{
          retries: 5,
          connTimeout: 6000,
          writeTimeout: 60000,
          readTimeout: 60000,
          "tls-verify": true,
        }
      };
      gatewayServicePage.newGatewayService(paras)
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
      paras={
        name: "route"+ new Date().getTime(),
        "service-id": service_id_name,
        tags: "tag1,tag2",
        protocols: "GRPC",
        "paths-input-1" : "/"
      }
      routePage.newRoute(paras)
    })
  })
  