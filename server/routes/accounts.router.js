const accounts = require("../controllers/accounts.controller");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");

const router = require("express").Router();

router.get("/", accounts.getAccounts);
router.get("/:id", accounts.getAccountById);
router.post("/register", accounts.register);
router.post("/login", accounts.login);
module.exports = router;
