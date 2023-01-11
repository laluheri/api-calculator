const router = require("express").Router();

const { getAll } = require("./controller");

router.get("/access", getAll);

module.exports = router;
