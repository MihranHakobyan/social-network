import { Post } from "../../../config/db/index.js"
import ApiError from "../../../libs/apiError.js";

class PostService {

    async createPost(userId, data, file) {
        const { title, description } = data; // data = req.body
        const image = file?.path;

        if (!image) {
            throw ApiError.BadRequest("Image is required");
        }

        return Post.create({
            title,
            description,
            image,
            userId
        });
    }

    async getMyPosts(userId) {
        const posts = await Post.getMyPosts(userId);
        return posts
    }

    async getPostById(postId) {
        const post = await Post.getPostById(postId)
        return post

    }
}

export default new PostService();