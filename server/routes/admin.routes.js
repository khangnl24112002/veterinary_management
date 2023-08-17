const admin = require("../controllers/admin.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = require("express").Router();

router.get("/", isAuthenticated, admin.getAllAdmins);
router.post("/", isAuthenticated, admin.addNewAdmin);
router.put("/", isAuthenticated, checkIsAdmin, admin.updateAdminInfo);
module.exports = router;
