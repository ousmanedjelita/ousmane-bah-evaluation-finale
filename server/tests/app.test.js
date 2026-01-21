/**
 * ✅ TEST D’API AVEC JEST + SUPERTEST (1 SEUL FICHIER)
 * Objectif : vérifier que /api/auth/login et /api/tasks?user_id=1 fonctionnent.
 * - Vérifie le statut HTTP
 * - Vérifie la réponse JSON
 */

import request from "supertest";
import express from "express";
import cors from "cors";

import authRoutes from "../routes/auth.js";
import tasksRoutes from "../routes/tasks.js";
import { db } from "../db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

describe("Tests API (Auth + Tasks)", () => {
  it("POST /api/auth/login → 200 + JSON correct (sans token)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "1234" });

    expect(res.statusCode).toBe(200);

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toBeDefined();

    expect(res.body).toHaveProperty("message");
  });

  it("GET /api/tasks?user_id=1 → 200 + tableau JSON", async () => {
    const res = await request(app).get("/api/tasks?user_id=1");

    expect(res.statusCode).toBe(200);

    expect(res.headers["content-type"]).toMatch(/json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(() => {
    db.end();
  });
});
