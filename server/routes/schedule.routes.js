const schedule = require("../controllers/schedule.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { checkIsCustomer } = require("../middlewares/checkIsCustomer");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

// Khoi tao router
const router = require("express").Router();

// Lay danh sach thong tin schedule
router.get("/", isAuthenticated, schedule.getSchedules);

router.get("/:customerId", isAuthenticated, schedule.getScheduleByCustomerId);

// Tao mot thong tin Drug moi
router.post("/", isAuthenticated, schedule.addNewSchedule);

router.delete("/:id", isAuthenticated, schedule.deleteSchedule);

module.exports = router;
