import { User } from "../../../config/db/index.js";
import ApiError from "../../../libs/apiError.js";
import { userDto } from "../dtos/userDto.js";

class userService {
    async findUserById(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw  ApiError.NotFound( "User not found");
        }        
        return user;
    }
    async findByLogin(login) {
        const user = await User.findOne({ where: { userName: login } });
        return user;
    }
    async findByUserName(userName) {
        const user = await User.findOne({ where: { userName } });
        if (!user) {
            return null;
        }
        return user.dataValues;
    }
    async getUser(userPayload) {
        const user = userDto(await this.findUserById(userPayload.id));
        return user;
    }
    async updateUsername(userId, newUsername) {
        const user = await this.findUserById(userId);

        const existingUser = await this.findByUserName(newUsername);
        if (existingUser) {
            throw new ApiError(400, "Username already taken");
        }
        user.userName = newUsername;

        await user.save();
        return userDto(user);
    }

    async changePrivacySettings(userId) {
        const user = await this.findUserById(userId);
        user.isPrivate = !user.isPrivate;
        await user.save();
        return { privacy: user.isPrivate };
    }
}

export default new userService();