import db, { Sequelize } from "../models/index";

const findById = async (id) => {
  const result = await db.Drug_Warehouse.findByPk(id);
  return result;
};

const insert = async (record) => {
  const result = await db.Drug_Warehouse.create(record);
  return result;
};

const update = async (id, drugRecord) => {
  const oldRecord = await db.Drug_Warehouse.findOne({
    where: {
      drugId: id,
    },
  });
  if (!oldRecord) return 0;
  await db.Drug_Warehouse.update(
    {
      quantity: drugRecord.quantity,
      unitPrice: drugRecord.unitPrice,
    },
    { where: { drugId: id } }
  );
  return 1;
};

const findByDrugId = async (drugId) => {
  const result = await db.Drug_Warehouse.findOne({
    where: {
      drugId,
    },
  });
  return result;
};
const delDrugRecord = async (id) => {
  const result = await db.Drug_Warehouse.destroy({
    where: {
      id,
    },
  });
  return result;
};

module.exports = {
  findById,
  insert,
  update,
  delDrugRecord,
  findByDrugId,
};
