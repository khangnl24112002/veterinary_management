const drug = require("../controllers/drug.controllers");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const multer = require("multer");

// Cấu hình Multer
const storage = multer.memoryStorage(); // Lưu tệp trong bộ nhớ để sau đó tải lên Cloudinary
const upload = multer({ storage: storage });

// Khoi tao router
const router = require("express").Router();

// Lay danh sach thong tin drug
router.get("/", isAuthenticated, drug.getDrugs);

router.get("/categories", isAuthenticated, drug.getAllCategories);

// Lay thong tin drug theo id
router.get("/:id", isAuthenticated, drug.getDrugById);

// Tao mot thong tin Drug moi
router.post(
  "/",
  isAuthenticated,
  checkIsAdmin,
  upload.single("imageUrl"),
  drug.addNewDrug
);

router.put(
  "/:id",
  isAuthenticated,
  checkIsAdmin,
  upload.single("imageUrl"),
  drug.updateDrug
);

router.delete("/:id", isAuthenticated, checkIsAdmin, drug.deleteDrug);

module.exports = router;
