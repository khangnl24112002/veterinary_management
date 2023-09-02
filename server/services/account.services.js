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

const createAccount = async (username, password, role) => {
  try {
    const [newAccount, created] = await db.Account.findOrCreate({
      where: { username },
      defaults: {
        username,
        password,
        role,
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
  try {
    const account = await db.Account.findOne({
      where: {
        username,
      },
    });
    return account;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const deleteAccount = async (id) => {
  try {
    await db.Account.destroy({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const updateAccount = async (id, password) => {
  try {
    await db.Account.update(
      { password: password },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return 0;
  }
};
module.exports = {
  getAll,
  findById,
  createAccount,
  findByUsername,
  deleteAccount,
  updateAccount,
};
