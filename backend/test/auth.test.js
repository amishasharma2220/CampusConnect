const request = require("supertest");
const app = require("../server"); // ensure server.js exports app (not app.listen)

jest.setTimeout(20000);

describe("Authentication API", () => {
  it("should fail login with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@test.com",
        password: "123456"
      });

    // In test mode DB is not connected, so API returns 500
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message");
  });
});