import bcrypt from "bcrypt";
import { User } from "../../../config/db/index.js";
import { userDto } from "../dtos/userDto.js";
import { generateToken } from "../middlewares/jwt.js";
import userService from "./userService.js";

class authService {

  async login(data) {
    if (!data) {
      throw new Error("User not found");
    }
    const user = await userService.findByUserName(data.userName);
    const token = generateToken({ id: user.id, username: user.userName });

    const isValidPassword = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      throw ApiError.BadRequestError("Password is not correct");
    }


    if (!user) {
      throw new Error("Invalid credentials");
    }

    const userDtoData = userDto(user);
    return { ...userDtoData, ...token };
  }

  async signup(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      surName: data.surName,
      userName: data.userName,
      password: hashedPassword
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