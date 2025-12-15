import express from 'express';
import authController from './authController.js';
import { signupValidator } from './middlewares/signupValidator.js';

export  const authRoute = express.Router();
authRoute.post('/login', authController.login);
authRoute.post('/signup',signupValidator(), authController.signup);
authRoute.get('/user', authController.getUser);
