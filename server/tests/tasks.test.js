/**
 * TEST JEST + SUPERTEST
 * Objectif : tester l’endpoint GET /api/tasks?user_id=1
 */

import request from "supertest";
import express from "express";
import cors from "cors";
import tasksRoutes from "../routes/tasks.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

describe("Tests API Tasks", () => {
  it("GET /api/tasks?user_id=1 → retourne des tâches", async () => {
    const res = await request(app).get("/api/tasks?user_id=1");

    //  Vérification du statut HTTP
    expect(res.statusCode).toBe(200);

    //  Vérification de la réponse JSON
    expect(Array.isArray(res.body)).toBe(true);
  });
});
