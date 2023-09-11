const { drugSchema } = require("../helpers/joi_schemas");
const drugServices = require("../services/drug.services");

const {
  errorResponse,
  successResponse,
} = require("../middlewares/handleError");

import cloudinary from "../upload/cloudinary_config";

const getDrugs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const drugs = await drugServices.getAll(category);
    return successResponse(res, 200, -1, drugs);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server errors");
  }
};

const getDrugById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const drug = await drugServices.findById(id);
    if (drug !== null) {
      return successResponse(res, 200, -1, drug);
    } else {
      return errorResponse(res, 404, 1, "Cannot find this drug");
    }
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server errors");
  }
};

const addNewDrug = async (req, res, next) => {
  try {
    const { name, type, usage, dosage, imageUrl } = req.body;
    // Validate data
    const drug = { name, type, usage, dosage, imageUrl };
    try {
      await drugSchema.validateAsync(drug);
    } catch (err) {
      return errorResponse(res, 400, 1, "Validate error");
    }
    // add new drugs by calling services
    const result = await drugServices.insert(drug);
    return successResponse(res, 201, -1, drug);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server errors");
  }
};

const updateDrug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type, usage, dosage, imageUrl } = req.body;
    const drug = { name, type, usage, dosage, imageUrl };
    try {
      await drugSchema.validateAsync(drug);
    } catch (err) {
      return errorResponse(res, 400, 1, "Validate error");
    }
    const result = await drugServices.update(id, drug);
    if (result === 0) {
      return errorResponse(res, 404, 1, `Cannot find drug has id = ${id}`);
    } else return successResponse(res, 200, -1, result);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server errors");
  }
};

const deleteDrug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await drugServices.delDrug(id);
    if (result === 1) {
      return successResponse(res, 200, -1, "Delete successfully");
    } else {
      return errorResponse(res, 404, 1, `Not found drug has id = ${id}`);
    }
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server errors");
  }
};

module.exports = {
  getDrugById,
  getDrugs,
  addNewDrug,
  updateDrug,
  deleteDrug,
};
