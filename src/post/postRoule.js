import express from 'express';
import postController from './postController.js';
import { validateToken } from '../../libs/jwt.js';
import postAccess from "./middleawres/postAccessMiddleware.js"
import { upload } from './middleawres/multerMiddleware.js';

export  const postRoute = express.Router();


postRoute.get("/", validateToken, postController.getMyPosts);
postRoute.post("/", validateToken, upload.single("image"), postController.createPost);
postRoute.get("/:id", validateToken,postAccess, postController.getPostById);
postRoute.post("/:id/like", validateToken, postController.likePost);
postRoute.post("/:id/comment", validateToken,postAccess, postController.addComment);