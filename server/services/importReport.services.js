import db, { Sequelize, sequelize } from "../models/index";

const getAll = async () => {
  return 1;
};

const findById = async (id) => {
  return 1;
};

const insert = async (importReport) => {
  const result = await db.Drug_Import_Report.create(importReport);
  return result;
};

const delImportReport = async (id) => {
  return 1;
};

module.exports = {
  getAll,
  findById,
  insert,
  delImportReport,
};
