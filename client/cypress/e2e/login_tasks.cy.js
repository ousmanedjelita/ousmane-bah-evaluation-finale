/* global cy, describe, it */

describe("E2E - Login puis Tasks", () => {
  it("Se connecte et voit les tâches", () => {
    cy.visit("/login");

    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Mot de passe"]').type("1234");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/tasks");

    // Vérifie affichage user (si ton UI affiche l’email)
    cy.contains("test@example.com");

    //  Vérifie qu’au moins une tâche est affichée (sans dépendre du titre "Tâches")
    cy.get("li", { timeout: 10000 }).should("have.length.greaterThan", 0);
  });
});
