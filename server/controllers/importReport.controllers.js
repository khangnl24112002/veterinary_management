const importReportServices = require("../services/importReport.services");
const importReportDetailServices = require("../services/importReportDetail.services");
const {
  errorResponse,
  successResponse,
} = require("../middlewares/handleError");

const getImportReports = async (req, res, next) => {
  return 1;
};

const getImportReportDetail = async (req, res, next) => {
  return 1;
};

const addNewImportReport = async (req, res, next) => {
  // get data from request.body
  const { date, seller, totalPrice, importDetails } = req.body;

  // Validate data
  if (
    date === undefined ||
    seller == undefined ||
    totalPrice == undefined ||
    importDetails == undefined
  ) {
    return errorResponse(res, 400, 1, "Invalid data");
  }

  // Add data to database

  console.log(date, seller, totalPrice, importDetails);
  return successResponse(res, 201, -1, {
    date,
    seller,
    totalPrice,
    importDetails,
  });
};

const deleteImportReport = async (req, res, next) => {
  return 1;
};

module.exports = {
  getImportReportDetail,
  getImportReports,
  addNewImportReport,
  deleteImportReport,
};
