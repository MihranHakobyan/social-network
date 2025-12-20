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
      const user = await userService.getUser(req.user);
      res.status(200).json({ user, ok: true });
    } catch (error) {
      next(error);
    }
  }
  async updateUsername(req, res, next) {
    try {
      const updatedUser = await userService.updateUsername(
        req.user.id,
        req.body.newUsername
      );
      res.status(200).json({ user: updatedUser, ok: true });
    } catch (error) {
      next(error);
    }
  }

  async changePrivacySettings(req, res, next) {
    try {
      const privacySettings = await userService.changePrivacySettings(req.user.id);
      res.status(200).json({ privacySettings, ok: true });
    } catch (error) {
      next(error);
    }
  }

  async getFollowers(req, res, next) {
    try {
      const followers = await userService.getFollowers(req.user.id, req.body.findeId);
      res.status(200).json({ followers, ok: true });
    } catch (error) {
      next(error);
    }
  }

  async getFollowings(req, res, next) {
    try {
      const followings = await userService.getFollowings(req.user.id, req.body.findeId);
      res.status(200).json({ followings, ok: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();