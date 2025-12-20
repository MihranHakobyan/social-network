import { isPrimitive } from "sequelize/lib/utils"

export const userDto = (user) => {
    return {
        id: user.id,
        name: user.name,
        surname: user.surName,
        username: user.userName,
        avatarUrl: user.avatarUrl,
        isPrivate: user.isPrivate
    }
}