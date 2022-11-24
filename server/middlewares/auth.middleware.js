import jwt from "jsonwebtoken";
import userModel from "../models/users.model.js";

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await userModel.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid authorization" });
        }
    }

    if(!token) {    
        res.status(401).json({ message: "Invalid authorization, no token"});
    }
}

export default protect;