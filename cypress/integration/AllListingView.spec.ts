describe("Get all listings", () => {
    beforeEach(() => {
        cy.login()
    })
    it("Get all listings successfully", () => {
        cy.intercept(
            {
                method: "GET",
                url: "http://localhost:8888/listing*",
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
        ).as("getListings")
        cy.visit("/listings")

        cy.wait("@getListings")
        cy.contains("Alle annonser")
        cy.contains("Grønn gressklipper").click()
    })
})
