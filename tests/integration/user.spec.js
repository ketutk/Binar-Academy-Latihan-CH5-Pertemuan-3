const app = require("../../app");
const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("test POST /api/v1/users endpoint", () => {
  let name = "usertest1";
  let email = "usertest1@gmail.com";
  let password = "usertest1";
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });
  afterAll(async () => {
    await prisma.user.deleteMany({});
  });
  test("test email belum terdaftar -> success", async () => {
    try {
      let result = await request(app).post("/api/v1/users").send({
        name,
        email,
        password,
      });
      expect(result.statusCode).toBe(201);
      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("message");
      expect(result.body).toHaveProperty("data");
      expect(result.body.data).toHaveProperty("id");
      expect(result.body.data).toHaveProperty("name");
      expect(result.body.data).toHaveProperty("email");
      expect(result.body.data).toHaveProperty("password");
      expect(result.body.data.name).toBe(name);
      expect(result.body.data.email).toBe(email);
      expect(result.body.data.password).toBe(password);
    } catch (error) {
      throw error;
    }
  });
  test("test email sudah terdaftar -> error", async () => {
    try {
      let { statusCode, body } = await request(app).post("/api/v1/users").send({
        name,
        email,
        password,
      });
      expect(statusCode).toBe(400);
    } catch (error) {
      throw error;
    }
  });
});

describe("test POST /api/v1/users/login endpoint", () => {
  let name = "usertest1";
  let email = "usertest1@gmail.com";
  let password = "usertest1";
  beforeAll(async () => {
    let user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  });
  afterAll(async () => {
    await prisma.user.deleteMany({});
  });
  test("login menggunakan email tidak terdaftar -> error", async () => {
    try {
      let result = await request(app).post("/api/v1/users/login").send({ email: "coba123@gmail.com", password: "usertest1" });
      expect(result.statusCode).toBe(400);
      expect(result.body.message).toBe("Email tidak terdaftar");
    } catch (error) {
      throw error;
    }
  });
  test("login menggunakan password yang tidak sesuai -> error", async () => {
    try {
      let result = await request(app).post("/api/v1/users/login").send({ email: "usertest1@gmail.com", password: "usertest12" });
      expect(result.statusCode).toBe(400);
      expect(result.body.message).toBe("Password tidak sesuai");
    } catch (error) {
      throw error;
    }
  });
  test("login menggunakan email dan password yang sesuai -> success", async () => {
    try {
      let result = await request(app).post("/api/v1/users/login").send({ email: "usertest1@gmail.com", password: "usertest1" });

      expect(result.statusCode).toBe(200);
      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("message");
      expect(result.body).toHaveProperty("data");
      expect(result.body.data).toHaveProperty("id");
      expect(result.body.data).toHaveProperty("name");
      expect(result.body.data).toHaveProperty("email");
      expect(result.body.data).toHaveProperty("token");
      expect(result.body.data.name).toBe(name);
      expect(result.body.data.email).toBe(email);
    } catch (error) {
      throw error;
    }
  });
});
