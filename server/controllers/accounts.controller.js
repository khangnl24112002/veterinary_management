const accountServices = require("../services/accounts.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  internalServerError,
  badRequest,
  conflict,
  unauthorized,
} = require("../middlewares/handleError");
const saltRounds = 10;

const getAccounts = async (req, res, next) => {
  try {
    const accounts = await accountServices.getAll();
    // neu model bi loi
    if (!accounts) {
      return next(internalServerError("Account Service bi loi"));
    }
    // neu query thanh cong
    else res.status(200).json(accounts);
  } catch (err) {
    return next(internalServerError("Account controller bi loi"));
  }
};

const getAccountById = async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await accountServices.findById(accountId);
    // truong hop bi loi xay ra
    if (account === 0) {
      return next(internalServerError("Account model bi loi"));
    }
    // neu tra ve thanh cong account thi se gui account ve phia nguoi dung
    else {
      res.status(200).json(account);
    }
  } catch (err) {
    // truong hop bi loi bat ngo o controller
    return next(internalServerError("Account controller bi loi"));
  }
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const avatar = "link avatar";
    // check missing data
    if (!username || !password) {
      return next(badRequest("Thieu thong tin username hoac password").message);
    }
    // hash password with bcrypt
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    // add new account using model
    const newAccount = await accountServices.createAccount(
      username,
      hashPassword,
      avatar
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
      let token;
      token = jwt.sign(
        {
          accountId: newAccount.id,
          username: newAccount.username,
          role: 2, // default is 2 (customer)
        },
        process.env.TOKEN,
        { expiresIn: process.env.TOKEN_EXPIRE }
      );
      res.status(201).json({
        success: true,
        data: {
          accountId: newAccount.id,
          username: newAccount.username,
          token: token,
        },
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
      return next(badRequest("Nhap thieu thong tin tai khoan hoac mat khau"));
    }
    const account = await accountServices.findByUsername(username);
    // truong hop khong tim thay ten TK hoac mat khau nhap ko khop
    if (!account || !bcrypt.compareSync(password, account.password)) {
      return next(unauthorized("Tai khoan hoac mat khau khong dung"));
    } else {
      // truong hop da dang nhap thanh cong
      // tao token
      let token;
      token = jwt.sign(
        {
          accountId: account.id,
          username: account.username,
          role: account.role,
        },
        process.env.TOKEN,
        { expiresIn: process.env.TOKEN_EXPIRE }
      );
      res.status(200).send({
        err: -1,
        mes: "Login successfully!",
        data: {
          accountId: account.id,
          username: account.username,
          token: token,
        },
      });
    }
  } catch (err) {
    return next(internalServerError("Account controller bi loi Login"));
  }
};

module.exports = {
  getAccounts,
  getAccountById,
  register,
  login,
};
