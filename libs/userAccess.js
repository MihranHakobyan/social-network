import userService from "../src/auth/services/userService.js";
import followerService from "../src/account/services/followerService.js";
import ApiError from "./apiError.js";

export default async (req, res, next) => {
  try {
    const currentUserId = req.user.id;

    const targetUserId = Number(req.params.id ?? currentUserId);

    if (!Number.isInteger(targetUserId)) {
      throw ApiError.BadRequest("Invalid user id");
    }

    const user = await userService.findUserById(targetUserId);
    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const isFollowing = await followerService.isFollowing(
      currentUserId,
      targetUserId
    );

    if (user.isPrivate && currentUserId !== targetUserId && !isFollowing) {
      throw ApiError.Forbidden("User's followings are private");
    }

    next();
  } catch (err) {
    next(err);
  }
};