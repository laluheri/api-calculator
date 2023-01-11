const User = require("./model");
const Access = require("../access/model");

const getAll = async (req, res, next) => {
  try {
    let user = await User.find();
    return res.json(user);
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user && user.password === password) {
      const access = new Access({ user: user._id });
      await access.save();
      return res.json({
        message: "success",
        user: user,
      });
    }
    return res.json({
      error: 1,
      message: "failed",
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

const logout = async (req, res, next) => {
  try {
    const user = req.body.user;
    console.log(">>>user");
    console.log(user);
    const lastLogin = await Access.findOne({ user }).sort("-createdAt");
    console.log(lastLogin);
    let access = await Access.findOneAndUpdate(
      {
        _id: lastLogin._id,
      },
      { updatedAt: new Date() },
      { new: true }
    );
    return res.json(lastLogin);
  } catch (err) {
    err.message;
  }
};

module.exports = {
  store,
  getAll,
  login,
  logout,
};
