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
function validateToken(req,res,next) {
 const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}


export {
    generateToken,
    validateToken
}