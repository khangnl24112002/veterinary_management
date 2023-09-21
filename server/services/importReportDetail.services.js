import db, { Sequelize, sequelize } from "../models/index";

const getAll = async () => {
  return 1;
};

const findById = async (id) => {
  return 1;
};

const insert = async (record) => {
  const result = await db.Import_Report_Detail.create(record);
  return result;
};

const delRecord = async (id) => {
  return 1;
};

module.exports = {
  getAll,
  findById,
  insert,
  delRecord,
};
