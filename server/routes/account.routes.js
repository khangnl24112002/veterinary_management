const accounts = require("../controllers/account.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = require("express").Router();

router.get("/", isAuthenticated, checkIsAdmin, accounts.getAccounts);
router.get("/:id", isAuthenticated, accounts.getAccountById);
router.post("/", isAuthenticated, checkIsAdmin, accounts.createAccount);
router.post("/register", accounts.register);
router.post("/login", accounts.login);
router.post("/refresh-token", accounts.refreshAccessToken);
module.exports = router;
