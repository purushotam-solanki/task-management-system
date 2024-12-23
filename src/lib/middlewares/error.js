const mongoose = require('mongoose');
const httpStatus = require('http-status')

const ApiError = require('@utils/ApiError');
const { envConfig, logger } = require('@lib/config');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (envConfig.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(envConfig.env === 'development' && { stack: err.stack }),
  };

  if (envConfig.env === 'development') {
    logger.error(err);
  }
  /**
   * TODO: We can send email to developer if status code >=500
   */
  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};