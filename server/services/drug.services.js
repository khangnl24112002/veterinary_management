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

const findById = async (id) => {
  const result = await db.Drug.findByPk(id);
  return result;
};

const insert = async (drug) => {
  const result = await db.Drug.create(drug);
  return result;
};

const update = async (id, drug) => {
  const oldDrug = await db.Drug.findByPk(id);
  if (!oldDrug) return 0;
  await db.Drug.update(
    {
      name: drug.name,
      type: drug.type,
      usage: drug.usage,
      dosage: drug.dosage,
      imageUrl: drug.imageUrl,
    },
    { where: { id } }
  );
  const updatedDrug = await db.Drug.findByPk(id);
  return updatedDrug;
};

const delDrug = async (id) => {};

const getTypes = async () => {};
module.exports = {
  getAll,
  findById,
  insert,
  update,
  delDrug,
};
