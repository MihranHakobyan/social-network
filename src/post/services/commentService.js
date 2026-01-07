import { Comment } from "../../../config/db/index.js"
import ApiError from "../../../libs/apiError.js";

class CommentService {

    async addComment(userId, postId, commentText) {
        if (!commentText) {
            throw ApiError.BadRequest("Comment is required");
        }

        return Comment.create({
            comment: commentText,
            postId,
            userId
        });
    }
}

export default new CommentService();