const admin = require("../controllers/admin.controllers");

const router = require("express").Router();

router.get("/", admin.getAllAdmins);
router.post("/", admin.addNewAdmin);

module.exports = router;
