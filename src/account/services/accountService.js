import { Follower, User } from "../../../config/db/index.js";

class AccountService {
    async getAccount(req) {        
        const userId = req.params.id;

        const user = await User.findByPk(userId, {
            attributes: ["name", "surname", "username", "avatarUrl"]
        });

        const followers = await Follower.findAll({ where: { followingId: userId , status: "followed"} });
        const followings = await Follower.findAll({ where: { followerId: userId, status: "followed" } });
        
        
        
        
        user.dataValues.followersCount = followers.length;
        user.dataValues.followingsCount = followings.length;
        return user;
    }
}

export default new AccountService();