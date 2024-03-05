import React, { useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { UserAuth } from "../authRelated/Authcontext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { signUp, user, ggllogIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const emailInputRef = useRef(null);

  console.log(user);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      displayName.trim() === ""
    ) {
      setError("All fields are required");
      emailInputRef.current.focus();
      return;
    }
    try {
      await signUp(email, password, displayName, profilePic);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignwithggl = async () => {
    try {
      await ggllogIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="formContainer w-screen h-screen flex justify-center items-center">
      <div className="formWrapper p-5 border rounded-lg flex flex-col gap-5 bg-white">
        <span className="logo">
          <img
            className="rounded-xl h-40 mx-auto"
            src="https://www.app-download.com/files/image/app/watchchat-2-fuer-whatsapp-icon.jpg"
            alt="logo"
          />
        </span>
        <span className="title">Register</span>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="border rounded-md p-2"
            type="text"
            placeholder="User Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <input
            className="border rounded-md p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border rounded-md p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="">
            <label htmlFor="profilePic" className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                id="profilePic"
                onChange={handleFileChange}
                className="hidden"
              />
              {profilePic ? (
                <img
                  src={selectedFile}
                  alt="Selected"
                  className="w-32 h-32 object-cover object-center rounded-full shadow-lg"
                />
              ) : (
                <FcAddImage className="text-5xl" />
              )}
            </label>
          </div>
          <button
            className="p-4 bg-blue-600 text-white rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className=" text-center">Or</p>
        <button
          className="p-4 bg-blue-600 text-white rounded-lg"
          onClick={handleSignwithggl}
        >
          Sign in with Google
        </button>
        <p>
          do you have an account?
          <Link to="/login" className="text-purple-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
