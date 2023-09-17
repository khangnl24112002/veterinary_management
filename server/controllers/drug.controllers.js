const { drugSchema } = require("../helpers/joi_schemas");
const drugServices = require("../services/drug.services");
const drugWarehouseServices = require("../services/drug_warehouse.services");
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
    const { name, type, usage, dosage } = req.body;
    const imageUrl = req.file.buffer;
    // Validate data
    const drug = { name, type, usage, dosage };
    try {
      await drugSchema.validateAsync(drug);
    } catch (err) {
      return errorResponse(res, 400, 1, "Validate error");
    }
    const upload = await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "raw",
          width: 200, // Chiều rộng sau khi tải lên
          height: 200, // Chiều cao sau khi tải lên
          crop: "fill", // Cắt và điều chỉnh để đảm bảo kích thước
          quality: "auto:good", // Chất lượng ảnh
          format: "jpg", // Định dạng ảnh
        },
        async (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            res.status(500).json({
              success: false,
              err: 1,
              message: "Loi khi upload anh len cloudinary!",
            });
          } else {
            // Luu thong tin nguoi dung vao co so du lieu
            const newInfo = {
              ...drug,
              imageUrl: result.secure_url,
            };
            const modelResult = await drugServices.insert(newInfo);
            if (result) {
              // insert to drug_warehouse info
              const drugWarehouseRecord = {
                quantity: 0,
                unitPrice: 0,
                drugId: modelResult.id,
              };
              await drugWarehouseServices.insert(drugWarehouseRecord);
            }
            return successResponse(res, 201, -1, modelResult);
          }
        }
      )
      .end(imageUrl);
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

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await drugServices.getCategories();
    return successResponse(res, 200, -1, categories);
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
  getAllCategories,
};
