// Generate Token
import jwt from 'jsonwebtoken';

import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookies = (userId, res) => {
    // Generate JWT token
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

    // Set cookie with JWT token
    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true,
        secure: ENV_VARS.NODE_ENV !== "development",
        sameSite: 'strict'
    });

    // Return user id
    return token;
}




