// store/authUser.js
import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLoggingIn: false,
    // signup
    signup: async (credential) => {
        set({ isSigningUp: true })
        try {
            const response = await axios.post("/api/v1/auth/signup", credential);
            set({ user: response.data.user, isSigningUp: false })
            toast.success("Account created successfully.")

        } catch (error) {
            const message = error.response?.data?.message || "Signup failed";
            toast.error(message);
            set({ isSigningUp: false, user: null });
        }
    },

    // Login
    login: async (credentials) => {
        set({ isLoggingIn: true });  // Start login process
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({ user: response.data.user, isLoggingIn: false });  // Update user and stop loading
            toast.success("Logged in successfully.");
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            set({ isLoggingIn: false, user: null });  // Clear user and stop loading
        }
     },

    // Logout
    logout: async () => { 
        try {
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false })
            toast.success("Logged out successfully.")
        } catch (error) {
            const message = error.response?.data?.message || "Failed to log out";
            toast.error(message);
            set({ isLoggingOut: false })
        }
    },

    // authCheck
    authCheck: async () => {
        try {
            const response = await axios.get("/api/v1/auth/authcheck");
            set({ user: response.data.user, isCheckingAuth: false })
        } catch (error) {
            set({ user: null, isCheckingAuth: false })
            // toast.error("Failed to check authentication." + error)
        }
    },
}))