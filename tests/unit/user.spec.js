const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createUser, getUserById } = require("../../services/users");

let user;

describe("test createUser()", () => {
  let name = "usertest1";
  let email = "usertest1@gmail.com";
  let password = "usertest1";

  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });
  test("test email belum terdaftar -> sukses", async () => {
    try {
      let result = await createUser(name, email, password);
      user = result;

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("email");
      expect(result).toHaveProperty("password");
      expect(result.name).toBe(name);
      expect(result.email).toBe(email);
      expect(result.password).toBe(password);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("test email sudah terdaftar -> error", async () => {
    try {
      await createUser(name, email, password);
    } catch (error) {
      expect(error.message).toBe("email sudah terdaftar");
    }
  });
});

describe("test getUserById", () => {
  // Berhasil
  test("test cari user dengan id yang sudah terdaftar -> sukses", async () => {
    try {
      let result = await getUserById(user.id);
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("email");
      expect(result).toHaveProperty("password");
      expect(result.id).toBe(user.id);
      expect(result.name).toBe(user.name);
      expect(result.email).toBe(user.email);
      expect(result.password).toBe(user.password);
    } catch (error) {
      expect(error.message).toBe("id tidak terdaftar");
    }
  });
  test("test cari user dengan id yang tidak terdaftar -> gagal", async () => {
    try {
      let result = await getUserById(user.id - 90);
    } catch (error) {
      expect(error.message).toBe("id tidak terdaftar");
    }
  });
});
