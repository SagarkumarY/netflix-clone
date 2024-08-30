// import jwt from 'jsonwebtoken';
// import { ENV_VARS } from '../config/envVars.js';
// import  {User} from '../models/user.model.js';

// export const protectRoute =  async (req,res, next) => {
//     try {
//         const token = req.cookies("jwt-netflix");
//         if (!token) {
//             return res.status(401).json({ status: false, message: "Not authorized, token is required" });
//         }

//         const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
             
//         if(!decoded) {
//             return res.status(401).json({ status: false, message: "Invalid token" });
//         }

//         const user = await User.findById(decoded.userId).select("-password");

//         if (!user) {
//             return res.status(401).json({ status: false, message: "User not found" });
//         }

//         req.user = user;

//         next();
       
//     } catch (error) {
//         console.log("Error in protect route middleware", error.message);
//         res.status(500).json({ status: false, message: "Server Error" });
//     }
// }



import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';
import User from  '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies['jwt-netflix'];
        if (!token) {
            return res.status(401).json({ status: false, message: "Not authorized, token is required" });
        }

        // Verify the token
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ status: false, message: "Invalid token" });
        }

        // Fetch the user by ID and exclude the password
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ status: false, message: "User not found" });
        }

        // Attach the user object to the request for access in subsequent middlewares or route handlers
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ status: false, message: "Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: false, message: "Token expired" });
        }
        res.status(500).json({ status: false, message: "Server Error" });
    }
};
