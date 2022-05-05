describe("Search for lists", () => {
    it("Search for lists successfully", () => {
        cy.visit("/")

        cy.get("[data-cy=searchbar").type("te")
        cy.get("[data-cy=searchbtn").click()

        cy.intercept(
            {
                method: "GET",
                url: "http://localhost:8888/listing/search/te",
            },
            (req) => {
                req.reply([
                    {
                        id: 3,
                        title: "Grønn gressklipper",
                        image: null,
                        price: 0.0,
                    },
                ])
            }
        ).as("getListingsByQuery")

        cy.wait("@getListingsByQuery")

        cy.contains("Grønn gressklipper").click()
    })
})
