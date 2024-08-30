import express from 'express';
import {protectRoute} from '../middleware/protectRoute.js'
import { authCheck, login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// Auth Check route

router.get("/authcheck",protectRoute, authCheck)

export default router;
