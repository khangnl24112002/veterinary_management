const {
  errorResponse,
  successResponse,
} = require("../middlewares/handleError");
const examScheduleService = require("../services/schedule.services");

const getExamSchedules = async (req, res, next) => {
  try {
    const schedules = await examScheduleService.getAll();
    return successResponse(res, 200, -1, schedules);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error!");
  }
};

const getExamScheduleDetail = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const schedules = await examScheduleService.findById(id);
    return successResponse(res, 200, -1, schedules);
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error!");
  }
};

const updateExamSchedule = async (req, res, next) => {
  try {
    const { isOk } = req.body;
    const { id } = req.params;
    const updateResult = await examScheduleService.updateConfirm(
      parseInt(id),
      isOk
    );
    if (updateResult) {
      const result = await examScheduleService.findById(parseInt(id));
      return successResponse(res, 201, -1, result);
    }
  } catch (error) {
    return errorResponse(res, 500, 1, "Internal server error");
  }
};

const deleteExamSchedule = async (req, res, next) => {
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
  getExamSchedules,
  updateExamSchedule,
  deleteExamSchedule,
  getExamScheduleDetail,
};
