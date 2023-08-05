const { customerSchema } = require("../helpers/joi_schemas");
const {
  internalServerError,
  badRequest,
} = require("../middlewares/handleError");

const customerServices = require("../services/customer.services");
const accountServices = require("../services/account.services");

const getCustomerInfo = async (req, res, next) => {
  try {
    // Customer muon lay thong tin cua chinh minh
  } catch (err) {
    return next(internalServerError("Customer Controller bi loi"));
  }
};

const addNewCustomer = async (req, res, next) => {
  try {
    // Lay thong tin customer tu req.body
    const { name, phoneNumber, address, email, username } = req.body;
    // xac thuc thong tin
    try {
      const customerInfo = await customerSchema.validateAsync({
        name,
        phoneNumber,
        address,
        email,
      });
      // Kiem tra xem trong database co account nao co accountId nhu vay khong
      const customerAccount = await accountServices.findByUsername(username);
      // neu khong co account nao co username nhu vay thi bao loi va tra ve
      if (customerAccount === null) {
        return next(
          badRequest(`Khong tim thay customer nao co username la ${username}`)
        );
      } else if (customerAccount === 0) {
        return next(internalServerError("Customer model bi loi"));
      }
      // Neu co account do thi them vao thong tin customer vao bang
      const newCustomer = await customerServices.insert(
        customerInfo,
        customerAccount.id
      );
      if (newCustomer === 0) {
        return next(internalServerError("Model Customer bi loi"));
      } else {
        res.status(200).json(newCustomer);
      }
    } catch (err) {
      return next(badRequest("Thong tin nhap vao khong dung."));
    }
  } catch (err) {
    return next(internalServerError("Customer controller bi loi"));
  }
};

module.exports = {
  getCustomerInfo,
  addNewCustomer,
};
