const accountRouter = require("./account.routes");
const adminRouter = require("./admin.routes");

const router = require("express").Router();

router.use("/accounts", accountRouter);
router.use("/admins", adminRouter);

module.exports = router;
