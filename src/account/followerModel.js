export default (sequelize, DataTypes) => {
    const Follower = sequelize.define(
        "Follower",
        {
            followerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            followingId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            accepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            tableName: "followers",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["followerId", "followingId"]
                }
            ]
        }
    );

    return Follower;
};
