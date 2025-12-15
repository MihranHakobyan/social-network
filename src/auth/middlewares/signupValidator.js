import ApiError from "../../../libs/apiError.js";
import userService from "../services/userService.js";

export const signupValidator = () => {
  return async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      if (!userName || !password) {
        throw ApiError.BadRequest(
          "Login and password are required"
        );
      }

      if (userName.length < 6) {
        throw ApiError.BadRequest(
          "Login is too short!"
        );
      }

      if (password.length < 6) {
        throw ApiError.BadRequest(
          "Password is too short!"
        );
      }

      const loginExists = await userService.findByLogin(userName);

      if (loginExists) {
        throw ApiError.BadRequest(
          "Login is busy"
        );
      }      
      return next();
    } catch (error) {      
      next(error);
    }
  };
};
