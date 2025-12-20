import ApiError from '../../../libs/apiError.js';
import followerService from '../../account/followerService.js';
import userService from '../services/userService.js';   

export default  async (req, res, next) => {    
    const userId = req.user.id;
    const { findeId } = req.body;
    const user = await userService.findUserById(findeId);
    const follow = await followerService.isFollowing(userId, findeId);
    if (user.isPrivate && userId !== findeId && !follow) {
        throw new ApiError(403, "User's followings are private");
    }
    next();
}