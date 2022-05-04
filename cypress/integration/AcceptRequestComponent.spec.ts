describe("Responding to a request", () => {
    it("Accepts request", () => {
        cy.intercept(
            {
                method: "GET",
                url: "http://localhost:8888/request/*"
            },
            (req) => {
                req.reply({
                    listing: {
                        firstname: "John",
                        title: "Hammer"
                    }
                })
            }
            ).as("getListing")
            cy.visit("/request/acceptmessage")
        cy.intercept( {
            method: "PUT",
            url: "http://localhost:8888/request/*",
        },
        (req) => {
            expect(req.body.accepted).to.include("ACCEPTED")
        }).as("acceptRequest")
        cy.get("[data-cy=accept]").click()
        cy.wait("@getListing")
    })

    it("Reject request", () => {
        cy.intercept(
            {
                method: "GET",
                url: "http://localhost:8888/request/*"
            },
            (req) => {
                req.reply({
                    listing: {
                        firstname: "John",
                        title: "Hammer"                        
                    }

                })
            }
            ).as("getListing")
            cy.visit("/request/acceptmessage")
        cy.visit("/request/acceptmessage")

        cy.intercept( {
            method: "PUT",
            url: "http://localhost:8888/request*",
        },
        (req) => {
            expect(req.body.accepted).to.include("REJECTED")
        }).as("rejectRequest")
        cy.get("[data-cy=reject]").click()
        cy.wait("@getListing")
    })
})