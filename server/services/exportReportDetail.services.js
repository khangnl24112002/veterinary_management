import db, { Sequelize, sequelize } from "../models/index";

const getAll = async () => {
  return 1;
};

const findById = async (id) => {
  return 1;
};

const insert = async (record) => {
  const result = await db.Prescription_Detail.create(record);
  return result;
};

// Fix it
const delRecordByImportId = async (id) => {
  const result = await db.Prescription_Detail.destroy({
    where: {
      drugImportReportId: id,
    },
  });
  return result;
};

module.exports = {
  getAll,
  findById,
  insert,
  delRecordByImportId,
};
