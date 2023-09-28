import db, { Sequelize, sequelize } from "../models/index";

const getAll = async () => {
  const importReports = await db.Prescription.findAll();
  return importReports;
};

const findById = async (id) => {
  const importReport = await db.Prescription.findByPk(id, {
    include: [
      {
        model: db.Prescription_Detail,
        include: [
          {
            model: db.Drug,
          },
        ],
      },
    ],
  });
  return importReport;
};

const insert = async (exportReport) => {
  const result = await db.Prescription.create(exportReport);
  return result;
};

const delExportReport = async (id) => {
  const result = await db.Prescription.destroy({
    where: {
      id,
    },
  });
  return result;
};

module.exports = {
  getAll,
  findById,
  insert,
  delExportReport,
};
