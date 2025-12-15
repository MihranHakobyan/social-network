import authService from "./services/authService.js";
import userService from "./services/userService.js";

class AuthController {
  async login(req, res, next) {
    try {
      const user = await authService.login(req.body);
      res.status(200).json({ user, ok: true });
    } catch (error) {
      next(error);
    }
  }

  async signup(req, res, next) {
    try {
      const newUser = await authService.signup(req.body);
      res.status(201).json({ newUser, ok: true });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.headers.authorization);
      res.status(200).json({ user, ok: true });
    } catch (error) {
      next(error);
    }
  }

}

export default new AuthController();