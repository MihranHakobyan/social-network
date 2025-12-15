import httpStatusCodes from "./httpStatusCodes.js";

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequest(message) {
    return new ApiError(httpStatusCodes.BAD_REQUEST, message);
  }

  static Unauthorized(message = "Unauthorized") {
    return new ApiError(httpStatusCodes.UNAUTHORIZED, message);
  }

  static Forbidden(message = "Forbidden") {
    return new ApiError(httpStatusCodes.FORBIDDEN, message);
  }

  static NotFound(message = "Not found") {
    return new ApiError(httpStatusCodes.NOT_FOUND, message);
  }
}

export default ApiError;