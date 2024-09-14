import React, { useState } from "react";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Footertext from "../components/Footertext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate if using react-router

const SignIn = () => {
  const [signinCreds, setsigninCreds] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate(); // To redirect after successful login

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!signinCreds.username || !signinCreds.password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      console.log(signinCreds.username , " " ,signinCreds.password)
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin", // Use environment variable
        {
          username: signinCreds.username,
          password: signinCreds.password,
        }
      );

      console.log(res);
      setError(null); // Clear any previous errors
      // Redirect after successful login
      //store the token generated in local storage.
      await localStorage.setItem("token",`${res.data.token}`);
      console.log(localStorage.getItem("token"));
      navigate("/");

    } catch (e) {
      console.error("Sign-in error", e);
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      <form onSubmit={handleSignIn} className="flex flex-col bg-gray-300 justify-center p-6">
        <Heading Text="SIGNIN" className="m-2 font-extrabold " />
        
        <Inputbox
          placeholder="abc@xyx.com"
          type="email"
          value={signinCreds.username}
          onChange={(event) =>
            setsigninCreds({
              ...signinCreds,
              username: event.target.value,
            })
          }
        />
        
        <Inputbox
          placeholder="Password"
          type="password"
          value={signinCreds.password}
          onChange={(event) =>
            setsigninCreds({
              ...signinCreds,
              password: event.target.value,
            })
          }
        />
        
        {error && <p className="text-red-600">{error}</p>} {/* Display error messages */}
        
        <button
          type="submit" // Change to submit for form submission
          className="font-semibold bg-green-500 border-3 hover:bg-green-700 mt-6"
        >
          Sign In
        </button>

        <Footertext buttonText="Register" Text="Don't have an account?" />
      </form>
    </div>
  );
};

export default SignIn;
