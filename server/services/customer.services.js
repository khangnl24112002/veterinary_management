import db from "../models/index";

const getAll = async () => {
  try {
    const customer = await db.Customer.findAll();
    return customer;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const insert = async ({ name, phoneNumber, address, email }, accountId) => {
  try {
    const customer = await db.Customer.create({
      name,
      phoneNumber,
      address,
      email,
      accountId,
    });
    return customer;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

module.exports = {
  getAll,
  insert,
};
