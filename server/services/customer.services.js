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
const insert = async (
  name,
  phoneNumber,
  address,
  email,
  avatar,
  customerAccountId
) => {
  try {
    const customer = await db.Customer.create({
      name,
      phoneNumber,
      address,
      email,
      avatar,
      accountId: customerAccountId,
    });
    return customer;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const deleteCustomer = async (id) => {
  try {
    const result = await db.Customer.destroy({
      where: {
        id,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
};

const update = async (name, phoneNumber, address, email, avatar, accountId) => {
  try {
    const result = await db.Customer.update(
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

module.exports = {
  getAll,
  insert,
  getById,
  getByAccountId,
  deleteCustomer,
  update,
};
