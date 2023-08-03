const account = require("../services/accounts.service");

const getAccounts = async (req, res) => {
  const accounts = await account.getAll();
  res.send(accounts);
};
const getAccountByUsername = (req, res) => {};

const getAccountById = async (req, res) => {
  const acc = await account.findById();
  res.send(acc);
};
module.exports = {
  getAccounts,
  getAccountByUsername,
  getAccountById,
};
