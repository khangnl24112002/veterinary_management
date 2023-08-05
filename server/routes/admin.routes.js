const admin = require("../controllers/admin.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { checkIsLogin } = require("../middlewares/checkIsLogin");

const router = require("express").Router();

router.get("/", checkIsLogin, checkIsAdmin, admin.getAllAdmins);
router.post("/", checkIsLogin, checkIsAdmin, admin.addNewAdmin);

module.exports = router;
