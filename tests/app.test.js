const request = require("supertest");
const app     = require("../src/app");

describe("GET /", () => {
  test("should return 200 and success message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Node.js CI/CD App is Running!");
  });

  test("should return version 1.0.0", async () => {
    const response = await request(app).get("/");
    expect(response.body.version).toBe("1.0.0");
  });
});

describe("GET /health", () => {
  test("should return 200 and healthy status", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("healthy");
  });

  test("should return uptime", async () => {
    const response = await request(app).get("/health");
    expect(response.body.uptime).toBeDefined();
  });
});

describe("GET /api/info", () => {
  test("should return app info", async () => {
    const response = await request(app).get("/api/info");
    expect(response.status).toBe(200);
    expect(response.body.app).toBe("nodejs-cicd-app");
    expect(response.body.cicd).toBe("GitHub Actions");
  });
});

describe("GET /api/greet/:name", () => {
  test("should greet user by name", async () => {
    const response = await request(app).get("/api/greet/Ajay");
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("Hello, Ajay!");
  });
});

describe("GET /unknown-route", () => {
  test("should return 404", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error");
  });
});
