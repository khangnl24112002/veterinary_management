const { drugSchema } = require("../helpers/joi_schemas");

import cloudinary from "../upload/cloudinary_config";

const getDrugs = async (req, res, next) => {};

const getDrugById = async (req, res, next) => {};

const addNewDrug = async (req, res, next) => {};

const updateDrug = async (req, res, next) => {};

const deleteDrug = async (req, res, next) => {};

module.exports = {
  getDrugById,
  getDrugs,
  addNewDrug,
  updateDrug,
  deleteDrug,
};
