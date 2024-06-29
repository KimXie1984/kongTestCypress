import { should } from "chai"

class BasePage {

    constructor(base_url, timeout=1000) {
        this.url = base_url
        this.timeout = timeout
    }

    visit(waitForKTableContainer=true){
        cy.visit(this.url)
        if (waitForKTableContainer) {
            this.waitForKTableContainer(this.timeout)
        }
    }

    waitForKTableContainer() {
        cy.title().should('include', this.title)
        // wait for table to load
        let exist = this.checkElementExists('.k-table-container')
        if (exist) {
            cy.get('.k-table-container',{timeout: this.timeout}).as('tableContainer').scrollIntoView().should('be.visible');
            console.log("Table container is visible")
        
            let exist = this.checkElementExists('.k-table-toolbar')
            console.log("k-table-toolbar exist", exist)
            if (exist) {
                return
            }

            let exist2 = this.checkElementExists('.k-table-empty-state')
            console.log("k-table-empty-state exist", exist2)
        }
    }

    countTableRows() {
        console.log("countTableRows starts")
        let count = 0
        cy.get('body').then($body =>{
            if ($body.find('table').length === 0){
                console.log("table find results 0")
                return 0
            }else{
                console.log("table find results != 0")
                console.log("Gateway service table exists, start to delete gateway service")
                cy.get('table').find('tr',{timeout: this.timeout}).then((rows) => {
                console.log("Gateway service table has " + rows.length + " rows")
                })
                return 0
            }
        })
        cy.wait(1000)
        return cy.wrap(count)
    }

    checkElementExists(selector, retry=5) {
        let found = false
        let run = true
        let count=0
        while (run) {
            let len = Cypress.$(selector).length

            if (len === 0) {
                // cy.reload()
                count=count+1
                cy.wait(1000)
                if(count === retry)
                {
                    run = false
                    console.log(`Element ${selector} not found after 5 seconds..Exit from loop!!!`)
                }
            } else {
                found = true
                run = false
                console.log(`Element ${selector} is found !`)
            }
        }
        return found
    }

    checkTableRowsCount(count) {
        console.log("Start to check table rows count: ", count)
        this.visit()
        cy.get('body').then($body =>{
            console.log("start to check table row count")
            cy.get('table').find('tr',{timeout: this.timeout}).then((rows) => {
              // there is an extra row for the header, so we need to add 1 to the expected count
              if (rows.length !== count + 1){
                cy.fail("Table has " + rows.length + " rows, but expected elements count " + count)
              }
            })
        })
    }
}

export default BasePage