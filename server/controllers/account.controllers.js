const accountServices = require("../services/account.services");
const adminServices = require("../services/admin.services");
const customerServices = require("../services/customer.services");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import transformedAccounts from "../helpers/transformAccount";
const {
  internalServerError,
  conflict,
  successResponse,
  errorResponse,
} = require("../middlewares/handleError");
const { verifyRefresh } = require("../middlewares/isAuthenticated");
const saltRounds = 10;

const getAccounts = async (req, res, next) => {
  try {
    const accounts = await accountServices.getAll();
    // neu model bi loi
    if (!accounts) {
      return errorResponse(res, 500, 1, "Account model has errors");
    }
    // neu query thanh cong => bien doi du lieu tren server de gui ve cho client
    else {
      const transformedAcc = transformedAccounts(accounts);
      return successResponse(res, 200, -1, transformedAcc);
    }
  } catch (err) {
    console.log(err);
    return errorResponse(res, 500, 1, "Account controller has errors");
  }
};

const getCustomerAccounts = async (req, res, next) => {
  try {
    const customerUsernames = await accountServices.getAllUsername();
    return successResponse(res, 200, -1, customerUsernames);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error");
  }
};

const getAccountById = async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await accountServices.findById(accountId);
    let accountInfo;
    // truong hop bi loi xay ra
    if (account === 0 || account === null) {
      return res.status(404).json({
        success: false,
        err: 1,
        message: "Khong tim thay du lieu",
      });
    }
    // neu tra ve thanh cong account thi se gui account ve phia nguoi dung
    else {
      // Lay thong tin tai khoan (neu co)
      const transformAccount = transformedAccounts([account]);
      if (account.role === 1) {
        accountInfo = await adminServices.getByAccountId(accountId);
      } else if (account.role === 2) {
        accountInfo = await customerServices.getByAccountId(accountId);
      }
      res.status(200).json({
        success: true,
        err: -1,
        data: {
          account: transformAccount[0],
          accountInfo: accountInfo,
        },
      });
    }
  } catch (err) {
    // truong hop bi loi bat ngo o controller
    return next(internalServerError("Account controller bi loi"));
  }
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // check missing data
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        err: 1,
        message: "Missing values",
      });
    }
    // hash password with bcrypt
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    // add new account using model
    const newAccount = await accountServices.createAccount(
      username,
      hashPassword
    );
    // Truong hop model bi loi khong create account duoc
    if (newAccount === 0) {
      return next(
        internalServerError("Model bi loi khong the tao duoc account")
      );
    }
    // Truong hop tao ra tai khoan da ton tai truoc do
    else if (newAccount === -1) {
      return next(conflict("Tai khoan da ton tai truoc do"));
    }
    // truong hop tao ra account thanh cong
    else {
      // tao token va gui ve nguoi dung
      const accessToken = jwt.sign(
        {
          accountId: newAccount.id,
          username: newAccount.username,
          role: 2, // default is 2 (customer)
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
      );
      // tao refresh token va gui ve nguoi dung
      const refreshToken = jwt.sign(
        {
          accountId: newAccount.id,
          username: newAccount.username,
          role: 2, // default is 2 (customer)
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
      );
      // tra response cho client
      // Gui response den cho client
      return res.status(200).json({
        success: true,
        err: -1,
        message: "Register successfully!",
        data: {
          accountId: newAccount.id,
          username: newAccount.username,
          role: 2,
        },
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    return next(internalServerError("Account controller register bi loi"));
  }
};

const login = async (req, res, next) => {
  try {
    // get data in body
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        err: 1,
        message: "Missing values",
      });
    }
    const account = await accountServices.findByUsername(username);
    // truong hop khong tim thay ten TK hoac mat khau nhap ko khop
    if (!account || !bcrypt.compareSync(password, account.password)) {
      return res.status(406).json({
        success: false,
        err: 2,
        message: "Invalid username or password!",
      });
    } else {
      // truong hop da dang nhap thanh cong
      // tao access token
      const accessToken = jwt.sign(
        {
          accountId: account.id,
          username: account.username,
          role: account.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
      );
      // tao refresh token
      // (thoi gian cua refresh token lon hon
      // nhieu so voi access token)
      const refreshToken = jwt.sign(
        {
          accountId: account.id,
          username: account.username,
          role: account.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
      );
      // Gui response den cho client
      return res.status(200).json({
        success: true,
        err: -1,
        message: "Login successfully!",
        data: {
          accountId: account.id,
          username: account.username,
          role: account.role,
        },
        accessToken,
        refreshToken,
      });
    }
  } catch (err) {
    return next(internalServerError("Account controller bi loi Login"));
  }
};

// Ham nay cap lai refresh Token cho client
const refreshAccessToken = async (req, res, next) => {
  const { account, refreshToken } = req.body;
  // Kiem tra refresh token cu co hop le hay khong?
  const isValid = await verifyRefresh(account, refreshToken);
  if (isValid === 0) {
    return res.status(403).json({
      success: false,
      err: 1,
      message: "Invalid token, try login again",
    });
  } else if (isValid === -1) {
    return res.status(401).json({
      success: false,
      err: 2,
      message: "Invalid account info",
    });
  }
  const accessToken = jwt.sign(
    {
      accountId: account.id,
      username: account.username,
      role: account.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
  res.status(200).json({ success: true, err: -1, accessToken: accessToken });
};

const createAccount = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({
        success: false,
        error: 1,
        message: "Missing values",
      });
    }
    // hash password with bcrypt
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    // add new account using model
    const newAccount = await accountServices.createAccount(
      username,
      hashPassword,
      role
    );
    // Truong hop model bi loi khong create account duoc
    if (newAccount === 0) {
      return res.json({
        success: false,
        error: 2,
        message: "Server has error, cannot create account.",
      });
    }
    // Truong hop tao ra tai khoan da ton tai truoc do
    else if (newAccount === -1) {
      return res.status(400).json({
        success: false,
        error: 3,
        message: "This account was created!",
      });
    }
    // truong hop tao ra account thanh cong
    else {
      // tra response cho client
      return res.status(200).json({
        success: true,
        err: -1,
        data: newAccount,
      });
    }
  } catch (err) {
    res.json(500).json({
      success: false,
      err: 4,
      message: "Internal server error",
    });
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await accountServices.findById(accountId);
    // truong hop khong tim thay account
    if (account === 0) {
      return res.status(404).json({
        success: false,
        err: 1,
        message: "Cannot find this account",
      });
    }
    // neu tim thay: xoa o Admin(Customer) va Account
    if (account.role === 1) {
      const adminInfo = await adminServices.getByAccountId(accountId);
      await adminServices.deleteAdmin(adminInfo.id);
    } else {
      // Implement customer deleting here
      const customerInfo = await customerServices.getByAccountId(accountId);
      await customerServices.deleteCustomer(customerInfo.id);
    }
    // Delete account
    await accountServices.deleteAccount(accountId);
    res.status(200).json({
      success: true,
      err: -1,
      message: "Delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: 1,
      message: "Internal server error",
    });
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        err: 2,
        message: "Password and confirm password are not matching!",
      });
    } else {
      // hashPassword
      const hashPassword = bcrypt.hashSync(password, saltRounds);
      // Update account
      const result = await accountServices.updateAccount(id, hashPassword);
      if (result !== 0) {
        return res.status(200).json({
          success: true,
          err: -1,
          data: result,
        });
      } else {
        return res.status(500).json({
          success: false,
          err: 1,
          message: "Internal server error (Model can't update account)",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: 1,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAccounts,
  getCustomerAccounts,
  getAccountById,
  register,
  login,
  refreshAccessToken,
  createAccount,
  deleteAccount,
  updateAccount,
};
