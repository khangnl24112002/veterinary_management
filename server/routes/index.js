const accountRouter = require("./accounts.router");

const router = require("express").Router();

router.use("/accounts", accountRouter);

module.exports = router;
