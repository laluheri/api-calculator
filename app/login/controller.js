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
      const access = new Access({
        user: user._id,
        login_time: new Date(),
        logout_time: new Date(),
      });
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
    const payload = req.body.user;
    const userAccess = await Access.findOne({ payload }).sort("-createdAt");
    const total_time = new Date() - userAccess.login_time;
    console.log(">>total_time");
    console.log(total_time);
    let access = await Access.findOneAndUpdate(
      {
        _id: userAccess._id,
      },
      {
        logout_time: new Date(),
        total_time: total_time,
      },
      { new: true }
    );

    return res.json(userAccess);
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
