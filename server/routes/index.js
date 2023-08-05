const accountRouter = require("./account.routes");
const adminRouter = require("./admin.routes");
const customerRouter = require("./customer.routes");

const router = require("express").Router();

router.use("/accounts", accountRouter);
router.use("/admins", adminRouter);
router.use("/customers", customerRouter);
module.exports = router;
