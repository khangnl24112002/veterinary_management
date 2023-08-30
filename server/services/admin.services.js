import db from "../models/index";

const getAll = async () => {
  try {
    const admin = await db.Admin.findAll();
    return admin;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const getByAccountId = async (id) => {
  try {
    const admin = await db.Admin.findOne({ where: { accountId: id } });
    if (admin === null) {
      return -1;
    } else return admin;
  } catch (err) {
    return 0;
  }
};
const insert = async (
  name,
  phoneNumber,
  address,
  email,
  avatar,
  adminAccountId
) => {
  try {
    const admin = await db.Admin.create({
      name,
      phoneNumber,
      address,
      email,
      avatar,
      accountId: adminAccountId,
    });
    return admin;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const update = async (name, phoneNumber, address, email, avatar, accountId) => {
  try {
    const result = await db.Admin.update(
      { name, phoneNumber, address, email, avatar },
      {
        where: {
          accountId: accountId,
        },
      }
    );
    return result;
  } catch (err) {
    return err;
  }
};

const deleteAdmin = async (id) => {
  try {
    const result = await db.Admin.destroy({
      where: {
        id,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
};

const findByAccountId = async (accountId) => {
  try {
    const admin = await db.Admin.findOne({ where: { accountId: accountId } });
    // neu khong tim thay account theo id thi tra ve -1
    return admin;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
module.exports = {
  getAll,
  insert,
  update,
  getByAccountId,
  deleteAdmin,
  findByAccountId,
};
