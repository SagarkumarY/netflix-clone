import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

function SignupPage() {
  const location = useLocation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Extract the email from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");

    if (emailParam) {
      setEmail(emailParam); // Set the email state if found in the URL
    }
  }, [location]);

  const {signup} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the signup function with the provided email, password, and username
    await signup({email, password, username});
  };

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

      <div className="flex justify-center items-center  mt-[1rem] mx-3">
        <div className=" w-full max-w-md p-8 space-y-6 bg-black/60  rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            sign up
          </h1>
          <form className=" space-y-2" onSubmit={handleSubmit}>
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
                htmlFor="username"
                className=" text-sm font-medium text-gray-300 block"
              >
                Username
              </label>

              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="username"
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
              // type="submit"
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              Sign Up
            </button>
          </form>

          <div className=" text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-500 cursor-pointer hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
