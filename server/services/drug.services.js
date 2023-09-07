import db from "../models/index";

const getAll = () => {};

const fingById = (id) => {};

const insert = (drug) => {
  const result = db.Drug.create(drug);
  return result;
};

const update = (id, drug) => {};

const delDrug = (id) => {};

const getTypes = () => {};
module.exports = {
  getAll,
  fingById,
  insert,
  update,
  delDrug,
};
