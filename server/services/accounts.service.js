import db from "../models/index";

const getAll = async (req, res) => {
  const acc = await db.Account.findAll();
  return acc;
};

module.exports = {
  getAll,
};
