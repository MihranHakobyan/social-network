import { User } from "../../../config/db/index.js";
import ApiError from "../../../libs/apiError.js";
import { userDto } from "../dtos/userDto.js";
import { validateToken } from "../middlewares/jwt.js";
class userService {
    async findUserById(userId) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user;
    }
    async findByLogin(login) {
        const user= await User.findOne({ where: { userName: login } });
        return user;
    }
    async findByUserName(userName) {
        const user= await User.findOne({ where: { userName } });
        return user.dataValues;
    }
    async getUser(token) {
        const valid = validateToken(token);
        if (!valid) {
            throw new ApiError(401, "Unauthorized");
        }
        const user = userDto(await this.findUserById(valid.id));
        return user;
    }
}

export default new userService();