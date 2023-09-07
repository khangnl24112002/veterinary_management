const { drugSchema } = require("../helpers/joi_schemas");
const drugServices = require("../services/drug.services");

const {
  errorResponse,
  successResponse,
} = require("../middlewares/handleError");

import cloudinary from "../upload/cloudinary_config";

const getDrugs = async (req, res, next) => {};

const getDrugById = async (req, res, next) => {};

const addNewDrug = async (req, res, next) => {
  try {
    const { name, type, usage, dosage, imageUrl } = req.body;
    // Validate data
    try {
      await drugSchema.validateAsync({
        name,
        type,
        usage,
        dosage,
        imageUrl,
      });
    } catch (err) {
      return errorResponse(res, 400, 1, "Validate error");
    }
    // add new drugs by calling services
    const result = drugServices.insert({ name, type, usage, dosage, imageUrl });
    return successResponse(res, 201, -1, result);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server errors");
  }
};

const updateDrug = async (req, res, next) => {};

const deleteDrug = async (req, res, next) => {};

module.exports = {
  getDrugById,
  getDrugs,
  addNewDrug,
  updateDrug,
  deleteDrug,
};
