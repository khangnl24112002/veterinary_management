const {
  errorResponse,
  successResponse,
} = require("../middlewares/handleError");
const examScheduleService = require("../services/schedule.services");

const getSchedules = async (req, res, next) => {
  try {
    return successResponse(res, 200, -1, null);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error!");
  }
};

const getScheduleById = async (req, res, next) => {
  try {
    return successResponse(res, 200, -1, null);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error");
  }
};

const addNewSchedule = async (req, res, next) => {
  try {
    // get data from request.body
    const { animalType, appointmentDate, customerId, isOk, symptom } = req.body;
    const newScheduleObject = {
      animalType,
      date: new Date(appointmentDate),
      customerId: parseInt(customerId),
      isOk,
      symptom,
    };
    console.log(newScheduleObject);
    const addScheduleResult = await examScheduleService.insert(
      newScheduleObject
    );
    return successResponse(res, 201, -1, "Insert successfully");
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error");
  }
};

const deleteSchedule = async (req, res, next) => {
  // delete all records
  return errorResponse(res, 500, 1, "Server error, cannot delete!");
};

module.exports = {
  getScheduleById,
  getSchedules,
  addNewSchedule,
  deleteSchedule,
};
