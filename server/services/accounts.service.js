import db from "../models/index";

const getAll = async (req, res) => {
  const acc = await db.Account.findAll();
  return acc;
};
const findById = async (req, res) => {
  const acc = await db.Account.findAll({
    where: {
      id: 1,
    },
    include: [{ model: db.Admin, as: "adminInfo" }],
  });
  return acc;
};
module.exports = {
  getAll,
  findById,
};
