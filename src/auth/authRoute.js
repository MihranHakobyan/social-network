import express from 'express';
import authController from './authController.js';
import { signupValidator } from './middlewares/signupValidator.js';
import { validateToken } from './middlewares/jwt.js';
import userAccess from './middlewares/userAccess.js';

export  const authRoute = express.Router();
authRoute.post('/login', authController.login);
authRoute.post('/signup',signupValidator(), authController.signup);
authRoute.get('/user', validateToken,authController.getUser);
authRoute.patch('/user/username', validateToken, authController.updateUsername);
authRoute.patch('/user/privacy', validateToken, authController.changePrivacySettings);
authRoute.get("/user/followers", validateToken,userAccess, authController.getFollowers);
authRoute.get("/user/followings", validateToken,userAccess, authController.getFollowings);