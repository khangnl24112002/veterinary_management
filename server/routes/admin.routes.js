const admin = require("../controllers/admin.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = require("express").Router();

router.get("/", isAuthenticated, admin.getAllAdmins);
router.post("/", isAuthenticated, admin.addNewAdmin);

module.exports = router;
