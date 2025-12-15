import ApiError from "../../../libs/apiError.js";

export default function authMiddleware(req, res, next) {
  if (!req.user) {
    return next(ApiError.Unauthorized());
  }

  if (!req.user.isActive) {
    return next(ApiError.Forbidden());
  }

  next();
}