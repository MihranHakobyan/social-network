import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
    return {
        token
    }
}
function validateToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (err) {
        return null
    }
}


export {
    generateToken,
    validateToken
}