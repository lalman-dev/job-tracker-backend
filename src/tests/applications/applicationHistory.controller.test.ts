import request from "supertest";
import app from "../../app.js";
import { connectTestDb, disconnectTestDb } from "../setup/testDb.js";

let token: string;
let applicationId: string;

beforeAll(async () => {
  await connectTestDb();

  const user = await request(app).post("/auth/register").send({
    email: "historyuser@example.com",
    password: "password123",
  });

  token = user.body.token;

  const appRes = await request(app)
    .post("/applications")
    .set("Authorization", `Bearer ${token}`)
    .send({ company: "Meta", role: "Backend Dev" });

  applicationId = appRes.body._id;
});

afterAll(async () => {
  await disconnectTestDb();
});

describe("Application Status History", () => {
  it("should record status change", async () => {
    await request(app)
      .patch(`/applications/${applicationId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "INTERVIEW" });

    const history = await request(app)
      .get(`/applications/${applicationId}/history`)
      .set("Authorization", `Bearer ${token}`);

    expect(history.status).toBe(200);
    expect(history.body.length).toBeGreaterThan(0);
  });
});
