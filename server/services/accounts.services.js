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
    const newAccount = await db.Account.create({ username, password, avatar });
    return newAccount;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

module.exports = {
  getAll,
  findById,
  createAccount,
};
