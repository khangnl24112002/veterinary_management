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

const getScheduleByCustomerId = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const schedule = await examScheduleService.findByCustomerId(
      parseInt(customerId)
    );
    if (!schedule) {
      return errorResponse(res, 404, 1, "Not found");
    }
    return successResponse(res, 200, -1, schedule);
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
  try {
    const scheduleId = parseInt(req.params.id);
    if (!scheduleId) {
      return errorResponse(res, 400, 1, "Bad request!");
    }
    const result = await examScheduleService.delSchedule(scheduleId);
    if (result) {
      return successResponse(res, 200, -1, "Delete successfully");
    }
  } catch (err) {
    return errorResponse(res, 500, 1, "Server error, cannot delete!");
  }
};

module.exports = {
  getScheduleByCustomerId,
  getSchedules,
  addNewSchedule,
  deleteSchedule,
};
