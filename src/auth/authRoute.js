import express from 'express';
import authController from './authController.js';
import { signupValidator } from './middlewares/signupValidator.js';
import { validateToken } from '../../libs/jwt.js';
import userAccess from '../../libs/userAccess.js';

export  const authRoute = express.Router();
authRoute.post('/login', authController.login);
authRoute.post('/signup',signupValidator(), authController.signup);
authRoute.get('/user', validateToken,authController.getUser);
authRoute.patch('/user/username', validateToken, authController.updateUsername);
authRoute.patch('/user/privacy', validateToken, authController.changePrivacySettings);
