import { Follower } from "../../../config/db/index.js";
import { User } from "../../../config/db/index.js";
import userService from "../../auth/services/userService.js";
import ApiError from "../../../libs/apiError.js";

class FollowService {

    addFollower = async (followerId, followingId) => {
        if (followerId === followingId) {
            throw ApiError.BadRequest("You cannot follow yourself");
        }

        const targetUser = await userService.findUserById(followingId);
        if (!targetUser) {
            throw ApiError.NotFound("User not found");
        }

        const existingFollow = await Follower.findOne({
            where: {
                followerId,
                followingId
            }
        });

        if (existingFollow) {
            if (existingFollow.status === "requested") {
                throw ApiError.BadRequest("Follow request already sent");
            }
            if (existingFollow.status === "followed") {
                throw ApiError.BadRequest("You are already following this user");
            }
        }

        const status = targetUser.isPrivate ? "requested" : "followed";

        return await Follower.create({
            followerId,
            followingId,
            status
        });
    };
    isFollowing = async (userId, findeId) => {
        const followers = await Follower.findOne({ where: { followingId: findeId, followerId: userId } });
        return followers;
    }

    findeAllFollowers = async (findeId) => {
        const followers = await Follower.findAll({ where: { followingId: findeId, status: "followed" } });
        return followers;
    }

    findeAllFollowings = async (findeId) => {
        const followings = await Follower.findAll({ where: { followerId: findeId, status: "followed" } });
        return followings;
    }

    async getFollowers(req) {
        const currentUserId = req.user.id;
        const targetUserId = Number(req.params.id ?? currentUserId);

        if (!Number.isInteger(targetUserId)) {
            throw ApiError.BadRequest("Invalid user id");
        }

        return await this.findeAllFollowers(targetUserId);
    }

    async getFollowings(req) {
        const currentUserId = req.user.id;
        const targetUserId = Number(req.params.id ?? currentUserId);

        if (!Number.isInteger(targetUserId)) {
            throw ApiError.BadRequest("Invalid user id");
        }

        return await this.findeAllFollowings(targetUserId);
    }
    async getFollowerRequests(userId) {
        const id = Number(userId);

        if (!Number.isInteger(id)) {
            throw ApiError.BadRequest("Invalid user id");
        }

        return await Follower.findAll({
            where: {
                followingId: id,
                status: "requested"
            },
            include: [
                {
                    model: User,
                    as: "followers",
                    attributes: ["id", "userName", "avatarUrl"]
                }
            ],
            attributes: {
                exclude: ["followerId"]
            }
        });

    }

    async acceptFollow(req) {
        const userId = Number(req.user.id);
        const followerId = Number(req.params.id);

        if (!Number.isInteger(userId) || !Number.isInteger(followerId)) {
            throw ApiError.BadRequest("Invalid user id");
        }

        const [updatedCount] = await Follower.update(
            { status: "followed" },
            {
                where: {
                    followingId: userId,
                    followerId,
                    status: "requested"
                }
            }
        );

        if (updatedCount === 0) {
            throw ApiError.BadRequest("Follow request not found or already handled");
        }

        return { message: "Follow successfully accepted" };
    }

    async declineFollow(req) {
        const userId = Number(req.user.id);
        const followerId = Number(req.params.id);

        if (!Number.isInteger(userId) || !Number.isInteger(followerId)) {
            throw ApiError.BadRequest("Invalid user id");
        }

        const [updatedCount] = await Follower.update(
            { status: "unfollowed" },
            {
                where: {
                    followingId: userId,
                    followerId,
                    status: "requested"
                }
            }
        );

        if (updatedCount === 0) {
            throw ApiError.BadRequest("Follow request not found or already handled");
        }

        return { message: "Follow request declined successfully" };
    }
}

export default new FollowService();