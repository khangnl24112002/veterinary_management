import db, { Sequelize, sequelize } from "../models/index";

const getAll = async () => {
  const schedules = await db.Exam_Schedule.findAll();
  return schedules;
};

// Fix it
const findById = async (id) => {
  const schedule = await db.Exam_Schedule.findByPk(id, {
    include: [db.Customer],
  });
  return schedule;
};

const findByCustomerId = async (customerId) => {
  const schedule = await db.Exam_Schedule.findAll({
    where: {
      customerId,
    },
  });
  return schedule;
};
const insert = async (newSchedule) => {
  const result = await db.Exam_Schedule.create(newSchedule);
  return result;
};

const delSchedule = async (id) => {
  const result = await db.Exam_Schedule.destroy({
    where: {
      id,
    },
  });
  return result;
};

const updateConfirm = async (id, isOk) => {
  const result = await db.Exam_Schedule.update({ isOk }, { where: { id } });
  return result;
};

module.exports = {
  getAll,
  findById,
  insert,
  delSchedule,
  findByCustomerId,
  updateConfirm,
};
