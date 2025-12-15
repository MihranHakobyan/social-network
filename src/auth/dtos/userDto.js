export const userDto = (user) => {
    return {
        id: user.id,
        name: user.name,
        surname: user.surName,
        username: user.userName,
    }
}