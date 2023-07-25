const accounts = require("../controllers/accounts.controller");

const router = require("express").Router();

router.get("/", accounts.getAccounts);

module.exports = router;
