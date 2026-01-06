import bcrypt from "bcrypt";
import { User } from "../../../config/db/index.js";
import { userDto } from "../dtos/userDto.js";
import { generateToken } from "../../../libs/jwt.js";
import userService from "./userService.js";
import ApiError from "../../../libs/apiError.js";

class authService {

  async login(data) {
    if (!data) {
      throw  ApiError.NotFound("User not found");
    }

    const user = await userService.findByUserName(data.userName);
    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isValidPassword) {
      throw ApiError.BadRequest("Password is not correct");
    }
    const token = generateToken({ id: user.id, username: user.userName });
    const userDtoData = userDto(user);
    return { ...userDtoData, ...token };
  }

  async signup(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      surName: data.surName,
      userName: data.userName,
      password: hashedPassword,
      avatarUrl: data.avatarUrl || null,
      isPrivate: data.isPrivate || false
    });

    const token = generateToken({
      id: user.id,
      username: user.userName
    });

    const safeUser = userDto(user);

    return { ...safeUser, ...token };
  }
}

export default new authService();