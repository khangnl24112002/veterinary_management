const customer = require("../controllers/customer.controllers");
const router = require("express").Router();
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.get("/:id", isAuthenticated, customer.getCustomerInfo);

// Tao mot thong tin nguoi dung moi
// chi co admin moi co quyen tao thong tin tai khoan cho customer
router.post("/", isAuthenticated, checkIsAdmin, customer.addNewCustomer);

module.exports = router;
