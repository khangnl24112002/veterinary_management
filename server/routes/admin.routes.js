const admin = require("../controllers/admin.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const multer = require("multer");

// Cấu hình Multer
const storage = multer.memoryStorage(); // Lưu tệp trong bộ nhớ để sau đó tải lên Cloudinary
const upload = multer({ storage: storage });

// Khoi tao Router
const router = require("express").Router();

// Lay danh sach thong tin Admin
router.get("/", isAuthenticated, admin.getAllAdmins);

// Lay thong tin admin theo id cua account
router.get("/:id", isAuthenticated, admin.getAdminByAccountId);

// Them mot thong tin admin moi
router.post(
  "/",
  isAuthenticated,
  checkIsAdmin,
  upload.single("avatar"),
  admin.addNewAdmin
);

// Cap nhat thong tin admin theo id cua admin info
router.put(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  upload.single("avatar"),
  admin.updateAdminInfo
);

module.exports = router;
