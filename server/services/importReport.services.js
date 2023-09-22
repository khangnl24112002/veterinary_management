import db, { Sequelize, sequelize } from "../models/index";

const getAll = async () => {
  const importReports = await db.Drug_Import_Report.findAll();
  return importReports;
};

const findById = async (id) => {
  const importReport = await db.Drug_Import_Report.findByPk(id, {
    include: [db.Import_Report_Detail],
  });
  return importReport;
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
