const customer = require("../controllers/customer.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const multer = require("multer");

// Cấu hình Multer
const storage = multer.memoryStorage(); // Lưu tệp trong bộ nhớ để sau đó tải lên Cloudinary
const upload = multer({ storage: storage });

// Khoi tao router
const router = require("express").Router();

// Lay danh sach thong tin customer
router.get("/", isAuthenticated, checkIsAdmin, customer.getCustomers);

// Lay thong tin customer theo id
router.get("/:id", isAuthenticated, customer.getCustomerInfo);

// Tao mot thong tin nguoi dung moi
// chi co admin moi co quyen tao thong tin tai khoan cho customer
router.post(
  "/",
  isAuthenticated,
  checkIsAdmin,
  upload.single("avatar"),
  customer.addNewCustomer
);

router.put(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  upload.single("avatar"),
  customer.updateCustomerInfo
);

module.exports = router;
