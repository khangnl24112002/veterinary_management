const accountServices = require("../services/accounts.services");
const bcrypt = require("bcrypt");
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
      res.status(201).json(newAccount);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAccounts,
  getAccountById,
  register,
};
