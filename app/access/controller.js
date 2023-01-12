const Access = require("./model");
const User = require("../login/model");
const { convertMsToHM } = require("../utils/convertMsToHm");

const getAll = async (req, res, next) => {
  try {
    let access = await Access.find({});
    const createdAt = access[0].createdAt;
    return res.json({
      message: "success",
      data: access,
    });
  } catch (err) {
    return res.json(err.message);
  }
};

const getTImeAccess = async (req, res, next) => {
  try {
    let milliseconds = 0;
    const countAccess = await Access.count();
    const user = await Access.find();
    for (let i = 0; i < countAccess; i++) {
      const timeAccess = user[i].updatedAt - user[i].createdAt;
      milliseconds = milliseconds + timeAccess;
    }
    const mhs = convertMsToHM(milliseconds);
    return res.json({ total_time: mhs });
  } catch (error) {}
};

module.exports = {
  getAll,
  getTImeAccess,
};
