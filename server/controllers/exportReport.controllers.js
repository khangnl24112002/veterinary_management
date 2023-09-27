const exportReportServices = require("../services/exportReport.services");
const exportReportDetailServices = require("../services/exportReportDetail.services");
const {
  errorResponse,
  successResponse,
} = require("../middlewares/handleError");

const getExportReports = async (req, res, next) => {
  try {
    const exportReports = await exportReportServices.getAll();
    return successResponse(res, 200, -1, exportReports);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error!");
  }
};

const getExportReportDetail = async (req, res, next) => {
  try {
    const exportReport = await exportReportServices.findById(
      parseInt(req.params.id)
    );
    if (exportReport) {
      return successResponse(res, 200, -1, exportReport);
    } else {
      return errorResponse(res, 404, 1, "Cannot found report");
    }
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error");
  }
};

const addNewExportReport = async (req, res, next) => {
  try {
    // get data from request.body

    return successResponse(res, 201, -1, "Insert successfully");
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error");
  }
};

const deleteExportReport = async (req, res, next) => {
  return errorResponse(res, 500, 1, "Server error, cannot delete!");
};

module.exports = {
  getExportReportDetail,
  getExportReports,
  addNewExportReport,
  deleteExportReport,
};
