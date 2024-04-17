const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createUser = async (name, email, password) => {
  try {
    let isExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isExist) {
      throw new Error("email sudah terdaftar");
    }

    let createUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return createUser;
  } catch (error) {
    throw error;
  }
};
exports.getUserById = async (id) => {
  try {
    let userData = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userData) {
      throw new Error("id tidak terdaftar");
    }
    return userData;
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, passwordUser) => {
  try {
    let userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userData) {
      throw new Error("Email tidak terdaftar");
    }

    if (userData.password !== passwordUser) {
      throw new Error("Password tidak sesuai");
    }

    let { password, ...user } = userData;
    return {
      ...user,
      token: "apajalah",
    };
  } catch (error) {
    throw error;
  }
};
