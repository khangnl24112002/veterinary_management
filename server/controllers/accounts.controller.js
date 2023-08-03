const account = require("../services/accounts.service");

const getAccounts = async (req, res) => {
  const accounts = await account.getAll();
  res.send(accounts);
};
const getAccountByUsername = (req, res) => {};
module.exports = {
  getAccounts,
  getAccountByUsername,
};
