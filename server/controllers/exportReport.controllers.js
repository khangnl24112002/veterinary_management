const exportReportServices = require("../services/exportReport.services");
const exportReportDetailServices = require("../services/exportReportDetail.services");
const customerService = require("../services/customer.services");
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
    const {
      date,
      customerName,
      customerAddress,
      customerPhoneNumber,
      exportDetails,
      totalPrice,
    } = req.body;
    // validate data
    if (
      date === undefined ||
      customerName == undefined ||
      customerAddress == undefined ||
      customerPhoneNumber == undefined ||
      totalPrice == undefined ||
      exportDetails == undefined
    ) {
      return errorResponse(res, 400, 1, "Invalid data");
    }
    // get customerId if exists
    const customer = await customerService.getByPhoneNumber(
      customerPhoneNumber
    );
    // convert data
    const exportReportObject = {
      date: date,
      customerName: customerName,
      customerAddress: customerAddress,
      totalPrice: parseInt(totalPrice),
      customerId: customer ? customer.id : null,
    };
    const exportReportResult = await exportReportServices.insert(
      exportReportObject
    );
    if (exportReportResult) {
      // insert all records
      const reportId = exportReportResult.id;
      exportDetails.map(async (record) => {
        const exportRecord = {
          quantity: parseInt(record.quantity),
          unitPrice: parseInt(record.unitPrice),
          price: parseInt(record.quantity) * parseInt(record.unitPrice),
          drugId: parseInt(record.drug.value),
          prescriptionId: reportId,
        };
        const insertRecordResult = await exportReportDetailServices.insert(
          exportRecord
        );
        if (!insertRecordResult) {
          return errorResponse(
            res,
            500,
            1,
            "Cannot insert data into database. Server error"
          );
        }
      });
    }
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
