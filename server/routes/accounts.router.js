const accounts = require("../controllers/accounts.controller");

const router = require("express").Router();

router.get("/", accounts.getAccounts);
router.get("/:id", accounts.getAccountById);
router.post("/register", accounts.register);
module.exports = router;
