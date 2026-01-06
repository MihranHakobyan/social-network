import express from 'express';
import accountController from './accountController.js';
import { validateToken } from '../../libs/jwt.js';
import userAccess from '../../libs/userAccess.js';

export  const accountRoute = express.Router();
accountRoute.get("/requests", validateToken,userAccess, accountController.getFollowerRequests);
accountRoute.get("/followers", validateToken,userAccess, accountController.getFollowers);
accountRoute.get("/followings", validateToken,userAccess, accountController.getFollowings);
accountRoute.get("/:id", validateToken,userAccess, accountController.getAccount);
accountRoute.post("/:id/follow", validateToken, accountController.addFollower);
accountRoute.patch("/request/:id/accept",validateToken,accountController.acceptFollow)
accountRoute.patch("/request/:id/decline",validateToken,accountController.declineFollow)
