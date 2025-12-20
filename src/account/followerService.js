import { Follower } from "../../config/db/index.js";

class followerService {
    addFollower = async (followerId, followingId) => {
        if (followerId === followingId) {
            throw new Error("You cannot follow yourself.");
        }
        const follower = await Follower.create({ followerId, followingId });
        return follower;
    }

    isFollowing = async (userId, findeId) => {
        const followers = await Follower.findOne({ where: { followingId: findeId, followerId: userId } });
        return followers;
    }

    findeAllFollowers = async (findeId) => {
        const followers = await Follower.findAll({ where: { followingId: findeId } });
        return followers;
    }
    findeAllFollowings = async (findeId) => {
        const followings = await Follower.findAll({ where: { followerId: findeId } });
        return followings;
    }   
}

export default new followerService();