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
  try {
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
    // convert data
    const importReportObject = {
      date: date,
      seller: seller.toString(),
      totalPrice: parseInt(totalPrice),
    };

    // insert data to database

    const importReportResult = await importReportServices.insert(
      importReportObject
    );
    if (importReportResult) {
      const reportId = importReportResult.id;
      // continue to insert records to database
      importDetails.map(async (record) => {
        const importRecord = {
          quantity: parseInt(record.quantity),
          unitPrice: parseInt(record.unitPrice),
          price: parseInt(record.quantity) * parseInt(record.unitPrice),
          drugId: parseInt(record.drug.value),
          drugImportReportId: reportId,
        };
        const insertRecordResult = await importReportDetailServices.insert(
          importRecord
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

      return successResponse(res, 201, -1, "Insert successfully");
    }
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, 1, "Internal server error");
  }
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
