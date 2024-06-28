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

    countTableRows(header="k-table-header-name", ) {
        cy.get('body').then($body =>{
            if ($body.find('table').length === 0){
                console.log("table find results 0")
                return 0
            }else{
                console.log("table find results != 0")
                let rows = cy.get('table').find('tr',{timeout: this.timeout}).then((rows) => {
                  let count = rows.length
                  for (let i = 0; i < rows.length; i++) {
                    if (rows[i].innerHTML.includes(excludeHeader)){
                        count--
                        console.log("Skip the header row")
                    }
                  }
                  return count
                })
            }
        })
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
}

export default BasePage