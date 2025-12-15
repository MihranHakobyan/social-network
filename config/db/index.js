import { DataTypes } from "sequelize";
import { sequelize } from "./db_configs.js";
import userModel from "../../src/auth/authModel.js";
const User = userModel(sequelize,DataTypes);
export { User };

