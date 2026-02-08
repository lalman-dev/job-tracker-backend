import request from "supertest";
import app from "../../app.js";
import { connectTestDb, disconnectTestDb } from "../setup/testDb.js";

let token: string;

beforeAll(async () => {
  await connectTestDb();

  // Register user
  const res = await request(app).post("/auth/register").send({
    email: "appuser@example.com",
    password: "password123",
  });

  token = res.body.token;
});

afterAll(async () => {
  await disconnectTestDb();
});

describe("Application Controller", () => {
  it("should reject unauthenticated creation", async () => {
    const res = await request(app)
      .post("/applications")
      .send({ company: "Google", role: "SWE" });

    expect(res.status).toBe(401);
  });

  it("should create application for authenticated user", async () => {
    const res = await request(app)
      .post("/applications")
      .set("Authorization", `Bearer ${token}`)
      .send({ company: "Google", role: "SWE" });

    expect(res.status).toBe(201);
    expect(res.body.company).toBe("Google");
  });

  it("should return only user's applications", async () => {
    const res = await request(app)
      .get("/applications")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
