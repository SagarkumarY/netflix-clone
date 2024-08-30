import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";


function LoginPage() {
  const {login} = useAuthStore()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleLogin = async (e) => {
    e.preventDefault();
    // call API to login user
    await login({email, password});
  }
    return (
      <div className="h-screen w-full hero-bg">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4 relative">
          <Link to={"/"}>
            <img
              src="/netflix-logo.png"
              alt="logo"
              className=" w-[200px]  z-40"
            />
          </Link>
        </header>
  
        <div className="flex justify-center items-center mt-[2rem] mx-3">
          <div className=" w-full max-w-md p-8 space-y-6 bg-black/60  rounded-lg shadow-md">
            <h1 className="text-center text-white text-2xl font-bold mb-4">
              sign In
            </h1>
            <form className=" space-y-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className=" text-sm font-medium text-gray-300 block"
                >
                  Email
                </label>
  
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="you@example.com"
                />
              </div>

  
              <div>
                <label
                  htmlFor="password"
                  className=" text-sm font-medium text-gray-300 block"
                >
                  Password
                </label>
  
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="********"
                />
              </div>
  
              <button
                type="submit"
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              >
                 Login
              </button>
            </form>
  
            <div className=" text-center text-gray-400">
              Dont't  have an account?{" "}
              <Link to={"/signup"} className="text-red-600 hover:text-red-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  
  }

export default LoginPage