import { Like } from "../../../config/db/index.js"
import ApiError from "../../../libs/apiError.js";

class likeService {

    async likePost(userId, postId) {
        const like = await Like.findOne({ where: { userId, postId } })
        if (like) {
            throw ApiError.BadRequest("You already liked this post");
        }

        return await Like.create({ userId, postId })
    }
}

export default new likeService();