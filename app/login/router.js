const router = require("express").Router();
const { store, getAll, login, logout } = require("./controller");

router.get("/user", getAll);
router.post("/user", store);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
