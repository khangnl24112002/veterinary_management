import db, { Sequelize, sequelize } from "../models/index";

const getAll = async () => {
  const schedules = await db.Exam_Schedule.findAll();
  return schedules;
};

// Fix it
const findById = async (id) => {
  const schedule = await db.Exam_Schedule.findByPk(id);
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

module.exports = {
  getAll,
  findById,
  insert,
  delSchedule,
};
