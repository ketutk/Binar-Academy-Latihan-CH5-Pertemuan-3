const { createUser, login } = require("../services/users");

exports.create = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    try {
      let user = await createUser(name, email, password);
      return res.status(201).json({
        status: true,
        message: "OK",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    try {
      let result = await login(email, password);
      return res.status(200).json({
        status: true,
        message: "OK",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};
