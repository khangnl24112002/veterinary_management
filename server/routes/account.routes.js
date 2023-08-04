const accounts = require("../controllers/account.controllers");

const router = require("express").Router();

router.get("/", accounts.getAccounts);
router.get("/:id", accounts.getAccountById);
router.post("/register", accounts.register);
router.post("/login", accounts.login);
module.exports = router;
