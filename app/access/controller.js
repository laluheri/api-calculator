const Access = require("./model");
const User = require("../login/model");

const getAll = async (req, res, next) => {
  try {
    let access = await Access.find({});
    return res.json({
      message: "success",
      data: access,
    });
  } catch (err) {
    return res.json(err.message);
  }
};

module.exports = {
  getAll,
};
