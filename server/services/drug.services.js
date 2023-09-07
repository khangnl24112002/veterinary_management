import db from "../models/index";

const getAll = async (category) => {
  const whereClause = {};
  if (category !== undefined && category !== null) {
    whereClause.type = category;
  }
  const result = await db.Drug.findAll({
    where: whereClause,
  });
  return result;
};

const fingById = (id) => {};

const insert = async (drug) => {
  const result = await db.Drug.create(drug);
  return result;
};

const update = async (id, drug) => {};

const delDrug = async (id) => {};

const getTypes = async () => {};
module.exports = {
  getAll,
  fingById,
  insert,
  update,
  delDrug,
};
