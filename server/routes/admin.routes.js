const admin = require("../controllers/admin.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");

const router = require("express").Router();

router.get("/", checkIsAdmin, admin.getAllAdmins);
router.post("/", checkIsAdmin, admin.addNewAdmin);

module.exports = router;
