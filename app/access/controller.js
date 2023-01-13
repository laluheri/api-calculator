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
    let data = [];
    const total_time = await Access.aggregate([
      {
        $group: {
          _id: { $month: "$login_time" },
          total_time: { $sum: "$total_time" },
        },
      },
    ]);
    for (let i = 0; i < total_time.length; i++) {
      let mhs = convertMsToHM(total_time[i].total_time);
      let minutes = Math.floor((total_time[i].total_time / 1000 / 60) % 60);
      data = [
        ...data,
        {
          month: total_time[i]._id,
          total_in_minutes: minutes,
          total_in_hour: mhs,
        },
      ];
    }
    return res.json({ total_time: data });
  } catch (error) {}
};

const getLongTime = async (req, res, next) => {
  try {
    let milliseconds = 0;
    const data = await Access.aggregate([
      {
        $group: {
          _id: {
            userId: "$user",
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            timeLogin: "$createdAt",
            timeLogout: "$updatedAt",
          },
        },
      },
    ]);

    for (let i = 0; i < data.length; i++) {
      const timeAccess = data[i]._id.timeLogout - data[i]._id.timeLogin;
      milliseconds = milliseconds + timeAccess;
    }
    const mhs = convertMsToHM(milliseconds);
    return res.json({ total_time: mhs });
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getAll,
  getTImeAccess,
  getLongTime,
};
