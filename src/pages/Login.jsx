import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../authRelated/Authcontext";

const Login = () => {
  const navigate = useNavigate();

  const { logIn, user, googlelogIn } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailInputRef = useRef(null);

  const handleSignwithggl = async () => {
    try {
      await googlelogIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password are required");
      emailInputRef.current.focus();
      return;
    }
    try {
      await logIn(email, password);
      console.log(user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="formContainer w-screen h-screen flex justify-center items-center">
      <div className="formWrapper p-5 bg-white border rounded-lg flex flex-col gap-5">
        <span className="logo">
          <img
            className="rounded-xl h-40 mx-auto"
            src="https://www.app-download.com/files/image/app/watchchat-2-fuer-whatsapp-icon.jpg"
            alt="logo"
          />
        </span>
        <span className="title">Login</span>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-2">
          <input
            ref={emailInputRef}
            className="border rounded-md p-2"
            type="email"
            label="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded-md p-2"
            type="password"
            label="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="p-4 bg-blue-600 text-white rounded-lg"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p className=" text-center">Or</p>
        <button
          className="p-4 bg-blue-600 text-white rounded-lg"
          onClick={handleSignwithggl}
        >
          Log in with Google
        </button>
        <p>
          To create an account.
          <Link to="/register" className="text-purple-700">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
