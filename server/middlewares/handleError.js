var createError = require("http-errors");

const internalServerError = (message) => {
  let error;
  if (message) {
    error = new createError.InternalServerError(message);
  } else {
    error = new createError.InternalServerError();
  }
  return error;
};

const badRequest = (message) => {
  let error;
  if (message) {
    error = new createError.BadRequest(message);
  } else {
    error = new createError.BadRequest();
  }
  return error;
};

const conflict = (message) => {
  let error;
  if (message) {
    error = new createError.Conflict(message);
  } else {
    error = new createError.Conflict();
  }
  return error;
};

const unauthorized = (message) => {
  let error;
  if (message) {
    error = new createError.Unauthorized(message);
  } else {
    error = new createError.Unauthorized();
  }
  return error;
};

const notFound = (message) => {
  let error;
  if (message) {
    error = new createError.NotFound(message);
  } else {
    error = new createError.NotFound();
  }
  return error;
};

module.exports = {
  internalServerError,
  badRequest,
  conflict,
  unauthorized,
  notFound,
};
