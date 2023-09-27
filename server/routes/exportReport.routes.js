const exportReport = require("../controllers/exportReport.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

// Khoi tao router
const router = require("express").Router();

// Lay danh sach thong tin drug
router.get("/", isAuthenticated, checkIsAdmin, exportReport.getExportReports);

router.get(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  exportReport.getExportReportDetail
);

// Tao mot thong tin Drug moi
router.post(
  "/",
  isAuthenticated,
  checkIsAdmin,
  exportReport.addNewExportReport
);

router.delete(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  exportReport.deleteExportReport
);

module.exports = router;
