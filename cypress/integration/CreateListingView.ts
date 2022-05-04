describe("Createing a new list", () => {
    it("Create new list successfully without phonenumber and price", () => {
        cy.visit("/listing/create")

        cy.get("[data-cy=title]").type("Gressklipper")
        cy.get("[data-cy=address]").type("7030")
        cy.get("[data-cy=description]").type(
            "Dette er en gressklipper som er i veldig god stand"
        )
        cy.intercept(
            {
                method: "POST",
                url: "http://localhost:8888/listing*",
            },
            (req) => {
                expect(req.body.title).to.include("Gressklipper")
                expect(req.body.description).to.include(
                    "Dette er en gressklipper som er i veldig god stand"
                )
                expect(req.body.address).to.include("7030")

                req.reply({
                    status: "Success",
                })
            }
        ).as("postListing")
        cy.get("[data-cy=publish]").click()
        cy.wait("@postListing")
    })

    it("Create new list successfully with phonenumber and price", () => {
        cy.visit("/listing/create")

        cy.get("[data-cy=title]").type("Gressklipper")
        cy.get("[data-cy=isFree]").click()
        cy.get("[data-cy=price]").type("30")
        cy.get("[data-cy=showPhone").click()
        cy.get("[data-cy=phone").type("99994444")
        cy.get("[data-cy=address]").type("7030")
        cy.get("[data-cy=description]").type(
            "Dette er en gressklipper som er i veldig god stand"
        )
        cy.intercept(
            {
                method: "POST",
                url: "http://localhost:8888/listing*",
            },
            (req) => {
                expect(req.body.title).to.include("Gressklipper")
                expect(req.body.description).to.include(
                    "Dette er en gressklipper som er i veldig god stand"
                )
                expect(req.body.phone).to.include("99994444")
                expect(req.body.address).to.include("7030")
                expect(req.body.price).to.equal(30)

                req.reply({
                    status: "Success",
                })
            }
        ).as("postListing")
        cy.get("[data-cy=publish]").click()
        cy.wait("@postListing")
    })

    it("Create new list without title", () => {
        cy.visit("/listing/create")

        cy.get("[data-cy=address]").type("7030")
        cy.get("[data-cy=description]").type(
            "Dette er en gressklipper som er i veldig god stand"
        )
        cy.get("[data-cy=publish]").click()
        cy.contains(/Dette feltet er påkrevd/i)
    })

    it("Create new list without address", () => {
        cy.visit("/listing/create")

        cy.get("[data-cy=title]").type("Gressklipper")
        cy.get("[data-cy=description]").type(
            "Dette er en gressklipper som er i veldig god stand"
        )
        cy.get("[data-cy=publish]").click()
        cy.contains(/address is a required field/i)
    })
})
