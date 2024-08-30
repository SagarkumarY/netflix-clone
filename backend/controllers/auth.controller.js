// controller file
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookies } from '../utils/generateToken.js';


// signup function
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;
        // check if email ,password ,username is send form user
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // email fomat is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: false, message: "Invalid email format" });
        }
        // check password length atelest 6
        if (password.length < 6) {
            return res.status(400).json({ status: false, message: "Password must be at least 6 characters long" });
        }

        // check if user already exist
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ status: false, message: "Email already exists" });
        }

        // check if user already exist
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ status: false, message: "Username already exists" });
        }

        // hash password

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);



        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const randomProfilePic = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];



        // create new user
        const user = new User({ email, password: hashedPassword, username, image: randomProfilePic });

        // generate token ya call token function
        generateTokenAndSetCookies(user._id, res)


        await user.save();
        res.status(201).json({ status: true, user: { ...user._doc, password: "" } });

    } catch (error) {
        console.log("Error is signup controller", error.message);
        res.status(500).json({ status: false, message: "Server Error" });
    }
}

// login function

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        // check if email and password is send form user
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // generate token ya call token function
        generateTokenAndSetCookies(user._id, res)

        res.status(200).json({ status: true, user: { ...user._doc, password: "" } });

    } catch (error) {
        console.log("Error is login controller", error.message);
        res.status(500).json({ status: false, message: "Server Error" });
    }
}

// logout function
export async function logout(req, res) {
    try {
        // remove token and cookies
        res.clearCookie('jwt-netflix');
        res.status(200).json({ status: true, message: "Logged out" });
    } catch (error) {
        console.log("Error is logout controller", error.message);
        res.status(500).json({ status: false, message: "Server Error" });
    }
};



// fetch all user
export async function getUser(req, res) {
    try {
        const users = await User.find();
        res.json(users);

    } catch (error) {
        console.log("Error is get user controller", error.message);
        res.status(500).json({ status: false, message: "Server Error" });

    }
};




// auth check function

export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user })
    } catch (error) {
        console.log("Error is auth check controller", error.message);
        res.status(500).json({ status: false, message: "Server Error" });
    }
};