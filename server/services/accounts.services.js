import db from "../models/index";

const getAll = async () => {
  try {
    const acc = await db.Account.findAll();
    return acc;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const findById = async (accountId) => {
  try {
    const acc = await db.Account.findByPk(accountId);
    // neu khong tim thay account theo id thi tra ve -1
    return acc;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const createAccount = async (username, password, avatar) => {
  try {
    const [newAccount, created] = await db.Account.findOrCreate({
      where: { username },
      defaults: {
        username,
        password,
        avatar,
      },
    });
    // truong hop da co tai khoan co username ton tai: tra ve -1
    if (!created) {
      return -1;
    } else {
      return newAccount;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const findByUsername = async (username) => {
  const account = await db.Account.findOne({
    where: {
      username,
    },
  });
  return account;
};
module.exports = {
  getAll,
  findById,
  createAccount,
  findByUsername,
};
