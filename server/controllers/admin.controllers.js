const { adminSchema } = require("../helpers/joi_schemas");
const {
  internalServerError,
  badRequest,
} = require("../middlewares/handleError");

const adminServices = require("../services/admin.services");

const getAllAdmins = async (req, res, next) => {
  try {
    const adminList = await adminServices.getAll();
    if (adminList === 0) {
      return next(internalServerError("Admin Model bi loi"));
    }
    res.status(200).json(adminList);
  } catch (err) {
    return next(internalServerError("Admin controller bi loi"));
  }
};

const addNewAdmin = async (req, res, next) => {
  try {
    // Lay thong tin admin tu body
    const { name, phoneNumber, address, email } = req.body;
    // Lay thong tin tai khoan admin
    const adminAccountId = parseInt(req.accountData.accountId);
    // xac thuc thong tin
    try {
      const adminInfo = await adminSchema.validateAsync({
        name,
        phoneNumber,
        address,
        email,
      });
      // Neu xac thuc thanh cong thi Goi den model de dien thong tin vao
      const newAdmin = await adminServices.insert(adminInfo, adminAccountId);
      if (newAdmin === 0) {
        return next(internalServerError("Model admin bi loi"));
      } else {
        res.status(200).json(newAdmin);
      }
    } catch (err) {
      return next(badRequest("Thong tin nhap vao khong dung."));
    }
  } catch (err) {
    return next(internalServerError("Admin controller bi loi"));
  }
};

const updateAdminInfo = async (req, res, next) => {
  const { name, phoneNumber, address, email, avatar } = req.body;
  const accountId = req.accountData.accountId;
  const result = await adminServices.update(
    name,
    phoneNumber,
    address,
    email,
    avatar,
    accountId
  );

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(500).json({
      success: false,
      err: 1,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllAdmins,
  addNewAdmin,
  updateAdminInfo,
};
