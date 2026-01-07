import { DataTypes } from "sequelize";
import { sequelize } from "./db_configs.js";
import userModel from "../../src/auth/authModel.js";
import followerModel from "../../src/account/followerModel.js";
import postModel from "../../src/post/models/postModel.js";
import commentModel from "../../src/post/models/commentModel.js";
import likeModel from "../../src/post/models/likeModel.js";
const User = userModel(sequelize, DataTypes);
const Follower = followerModel(sequelize, DataTypes);
const Post = postModel(sequelize, DataTypes)
const Comment = commentModel(sequelize, DataTypes)
const Like = likeModel(sequelize, DataTypes)

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

User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts"
});

User.hasMany(Like, {
  foreignKey: "userId",
  as: "likes",
  onDelete: "CASCADE"
});

Follower.belongsTo(User, {
  as: "followers",
  foreignKey: "followerId"
});

Follower.belongsTo(User, {
  as: "following",
  foreignKey: "followingId"
});

Post.belongsTo(User, {
  foreignKey: "userId"
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  as: "comments",
  onDelete: "CASCADE"
});


Post.hasMany(Like, {
  foreignKey: "postId",
  as: "likes",
  onDelete: "CASCADE"
});

Comment.belongsTo(User, {
  foreignKey: "userId"
});

Comment.belongsTo(Post, {
  foreignKey: "postId"
});

Like.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

Like.belongsTo(Post, {
  foreignKey: "postId",
  as: "post"
});

export { User, Follower, Post, Comment, Like };