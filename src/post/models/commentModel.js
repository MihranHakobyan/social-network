export default (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "Comment",
        {
            comment: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        });
        return Comment
}