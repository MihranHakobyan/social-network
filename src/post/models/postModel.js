import {Like,Comment,User} from "../../../config/db/index.js"

export default (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: DataTypes.TEXT,
            image: DataTypes.STRING,
            isPublic: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }
    );

    Post.getMyPosts = async function (userId) {
        return await Post.findAll({
            where: { userId },
            include: [
                {
                    model: Like,
                    as: "likes",
                    attributes: ["id", "userId", "createdAt"]
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id", "comment", "userId", "createdAt"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });
    };


      Post.getPostById = async function (postId) {
    return await Post.findOne({
      where: { id: postId },
      include: [
        {
          model: Like,
          as: "likes",
          attributes: ["id", "userId", "createdAt"]
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment", "userId", "createdAt"],
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "userName"]
            }
          ]
        }
      ]
    });
  };
    return Post;
};
