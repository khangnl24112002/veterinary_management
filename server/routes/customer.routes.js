const customer = require("../controllers/customer.controllers");
const router = require("express").Router();
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const multer = require("multer");
// Cấu hình Multer
const storage = multer.memoryStorage(); // Lưu tệp trong bộ nhớ để sau đó tải lên Cloudinary
const upload = multer({ storage: storage });

router.get("/", isAuthenticated, checkIsAdmin, customer.getCustomers);
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

module.exports = router;
