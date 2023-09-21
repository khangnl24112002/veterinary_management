const importReport = require("../controllers/importReport.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

// Khoi tao router
const router = require("express").Router();

// Lay danh sach thong tin drug
router.get("/", isAuthenticated, checkIsAdmin, importReport.getImportReports);

router.get(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  importReport.getImportReportDetail
);

// Tao mot thong tin Drug moi
router.post(
  "/",
  isAuthenticated,
  checkIsAdmin,
  importReport.addNewImportReport
);

router.delete(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  importReport.deleteImportReport
);

module.exports = router;
