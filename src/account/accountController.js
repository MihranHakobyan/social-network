import accountService from "./services/accountService.js";
import followerService from "./services/followerService.js";

class AccountController {


  async getFollowers(req, res, next) {
    try {
      const followers = await followerService.getFollowers(req);
      res.status(200).json({ followers, ok: true });
    } catch (error) {
      next(error);
    }
  }

  async getFollowings(req, res, next) {
    try {
      const followings = await followerService.getFollowings(req);
      res.status(200).json({ followings, ok: true });
    } catch (error) {
      next(error);
    }
  }
  async getAccount(req, res, next) {
    console.log(1);

    try {
      const user = await accountService.getAccount(req);
      res.status(200).json({ user, ok: true });
    } catch (error) {
      next(error);
    }
  }

  addFollower = async (req, res, next) => {
    try {
      const followerId = req.user.id;
      const followingId = req.params.id;
      const follower = await followerService.addFollower(followerId, followingId);
      res.status(201).json({ follower, ok: true });
    } catch (error) {
      next(error);
    }
  }

  getFollowerRequests = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const requests = await followerService.getFollowerRequests(userId);
      res.status(200).json({ requests, ok: true });
    } catch (error) {
      next(error);
    }
  }

  acceptFollow = async (req, res, next) => {
    try {
      const accept = await followerService.acceptFollow(req)
      res.status(200).json({ accept, ok: true });
    } catch (error) {
      next(error);
    }
  }

  declineFollow = async (req, res, next) => {
    try {
      const decline = await followerService.declineFollow(req)
      res.status(200).json({ decline, ok: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new AccountController();