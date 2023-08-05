const customer = require("../controllers/customer.controllers");
const router = require("express").Router();
const { checkIsLogin } = require("../middlewares/checkIsLogin");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");

router.get("/:id", checkIsLogin, customer.getCustomerInfo);

// Tao mot thong tin nguoi dung moi
// chi co admin moi co quyen tao thong tin tai khoan cho customer
router.post("/", checkIsLogin, checkIsAdmin, customer.addNewCustomer);

module.exports = router;
