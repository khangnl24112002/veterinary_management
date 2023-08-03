const accountServices = require("../services/accounts.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const getAccounts = async (req, res) => {
  try {
    const accounts = await accountServices.getAll();
    // neu model bi loi
    if (!accounts) {
      res.status(500).json({
        err: -1,
        mes: "Internal server error",
      });
    }
    // neu query thanh cong
    else res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({
      err: -1,
      mes: "Internal server error",
    });
  }
};

const getAccountById = async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await accountServices.findById(accountId);
    // truong hop bi loi xay ra
    if (account === 0) {
      res.status(500).json({
        err: -1,
        mes: "Internal server error",
      });
    }
    // neu tra ve thanh cong account thi se gui account ve phia nguoi dung
    else {
      res.status(200).json(account);
    }
  } catch (err) {
    // truong hop bi loi bat ngo o controller
    res.status(500).json({
      err: -1,
      mes: "Internal server error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const avatar = "link avatar";
    // check missing data
    if (!username || !password) {
      res.status(400).json({
        err: -1,
        mes: "Missing username or password!",
      });
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
      res.status(500).json({
        err: -1,
        mes: "Cannot create account",
      });
    }
    // Truong hop tao ra tai khoan da ton tai truoc do
    else if (newAccount === -1) {
      res.status(409).json({
        err: -1,
        mes: "Account already have in system!",
      });
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
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    // get data in body
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        err: -1,
        mes: "Missing username or password!",
      });
    }
    const account = await accountServices.findByUsername(username);
    // truong hop khong tim thay ten TK hoac mat khau nhap ko khop
    if (!account || !bcrypt.compareSync(password, account.password)) {
      res.status(401).json({
        err: -1,
        mes: "Wrong username or password!",
      });
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
    console.log(err);
  }
};

module.exports = {
  getAccounts,
  getAccountById,
  register,
  login,
};
