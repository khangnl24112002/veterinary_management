const admin = require("../controllers/admin.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const multer = require("multer");
// Cấu hình Multer
const storage = multer.memoryStorage(); // Lưu tệp trong bộ nhớ để sau đó tải lên Cloudinary
const upload = multer({ storage: storage });

const router = require("express").Router();

router.get("/", isAuthenticated, admin.getAllAdmins);
router.get("/:id", isAuthenticated, admin.getAdminByAccountId);
router.post("/", isAuthenticated, admin.addNewAdmin);
router.put(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  upload.single("avatar"),
  admin.updateAdminInfo
);
module.exports = router;
