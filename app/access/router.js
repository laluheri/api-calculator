const router = require("express").Router();

const { getAll, getTImeAccess } = require("./controller");

router.get("/access", getAll);
router.get("/time_access", getTImeAccess);

module.exports = router;
