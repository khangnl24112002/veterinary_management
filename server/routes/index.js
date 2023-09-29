const accountRouter = require("./account.routes");
const adminRouter = require("./admin.routes");
const customerRouter = require("./customer.routes");
const drugRouter = require("./drug.routes");
const importReportRouter = require("./importReport.routes");
const exportReportRouter = require("./exportReport.routes");
const scheduleRouter = require("./schedule.routes");
const examScheduleRouter = require("./examSchedule.routes");

const router = require("express").Router();

router.use("/accounts", accountRouter);
router.use("/admins", adminRouter);
router.use("/customers", customerRouter);
router.use("/drugs", drugRouter);
router.use("/imports", importReportRouter);
router.use("/exports", exportReportRouter);
router.use("/appointments", scheduleRouter);
router.use("/examSchedules", examScheduleRouter);
module.exports = router;
