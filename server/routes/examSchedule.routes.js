const examSchedule = require("../controllers/examSchedules.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

// Khoi tao router
const router = require("express").Router();

// Lay danh sach thong tin drug
router.get("/", isAuthenticated, checkIsAdmin, examSchedule.getExamSchedules);

// Lay danh sach thong tin drug
router.get(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  examSchedule.getExamScheduleDetail
);

// Tao mot thong tin Drug moi
router.put(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  examSchedule.updateExamSchedule
);

router.delete(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  examSchedule.deleteExamSchedule
);

module.exports = router;
