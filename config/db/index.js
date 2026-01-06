import { DataTypes } from "sequelize";
import { sequelize } from "./db_configs.js";
import userModel from "../../src/auth/authModel.js";
import followerModel from "../../src/account/followerModel.js";
const User = userModel(sequelize,DataTypes);
const Follower= followerModel(sequelize,DataTypes);

User.belongsToMany(User, {
  through: Follower,
  as: "Following",
  foreignKey: "followerId",
  otherKey: "followingId"
});

User.belongsToMany(User, {
  through: Follower,
  as: "Followers",
  foreignKey: "followingId",
  otherKey: "followerId"
});

Follower.belongsTo(User, {
  as: "followers",
  foreignKey: "followerId"
});

Follower.belongsTo(User, {
  as: "following",
  foreignKey: "followingId"
});


export { User, Follower };