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

const insert = async (
  { name, phoneNumber, address, email },
  adminAccountId
) => {
  try {
    const admin = await db.Admin.create({
      name,
      phoneNumber,
      address,
      email,
      accountId: adminAccountId,
    });
    return admin;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

module.exports = {
  getAll,
  insert,
};
