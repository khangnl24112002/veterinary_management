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

const getByAccountId = async (id) => {
  try {
    const customer = await db.Customer.findOne({ where: { accountId: id } });
    if (customer === null) {
      return -1;
    } else return customer;
  } catch (err) {
    return 0;
  }
};

const getById = async (customerId) => {
  try {
    const customer = await db.Customer.findByPk(customerId);
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
  getById,
  getByAccountId,
};
