const router = require("express").Router();

const { getAll, getTImeAccess, getLongTime } = require("./controller");

router.get("/access", getAll);
router.get("/time_access", getTImeAccess);
router.get("/long_time", getLongTime);

module.exports = router;
