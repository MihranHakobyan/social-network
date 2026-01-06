import httpStatusCodes from "./httpStatusCodes.js";
import ApiError from "./apiError.js";

export default function errorMiddleware(err, req, res, next) {
  console.log(err.message,err.stack);
  
  
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      ok: false,
      message: err.message
    });
  }

  return res.status(httpStatusCodes.SERVER_ERROR).json({
    ok: false,
    message: "Internal server error"
  });
}
