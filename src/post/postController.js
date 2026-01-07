import postService from "./services/postService.js"
import likeService from "./services/likeService.js";
import commentService from "./services/commentService.js";

class postController {

    createPost = async (req, res, next) => {
        try {
            const post = await postService.createPost(
                req.user.id,
                req.body,
                req.file
            );
            res.status(201).json({ post, ok: true });
        } catch (error) {
            next(error);
        }
    }

    getMyPosts = async (req, res, next) => {
        try {
            const posts = await postService.getMyPosts(req.user.id)
            res.status(200).json({ posts, ok: true });
        } catch (error) {
            next(error);
        }
    }

    getPostById = async (req, res, next) => {
        try {
            const post = await postService.getPostById(req.params.id)
            res.status(200).json({ post, ok: true })
        } catch (error) {
            next(error)
        }
    }

    likePost = async (req, res, next) => {
        try {
            const like = await likeService.likePost(req.user.id, req.params.id)
            res.status(201).json({ like, ok: true })
        } catch (error) {
            next(error)
        }
    }

    addComment = async (req, res, next) => {
        try {
            const comment = await commentService.addComment(req.user.id, req.params.id, req.body.comment)
            res.status(201).json({ comment, ok: true })
        } catch (error) {
            next(error)
        }
    }
}



export default new postController()