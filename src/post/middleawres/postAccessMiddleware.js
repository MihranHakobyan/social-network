import { Post } from "../../../config/db/index.js"
import userAccess from "../../../libs/userAccess.js"
import ApiError from "../../../libs/apiError.js"

export default async (req, res, next) => {
    try {
        const userId = req.user.id
        const postId = req.params.id

        const post = await Post.findOne({ where: { id: postId, } })
               
        if (!post) {
            throw ApiError.NotFound("post not found");
        } else if (!post.isPublic) {
            throw ApiError.Forbidden("This post is private");
        }
        req.params.id = post.userId

        if (userAccess) {
            req.params.id = postId
            next()
        }


    } catch (error) {
        next(error)
    }

}