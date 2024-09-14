import React, { useState } from "react";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Footertext from "../components/Footertext";
import axios from "axios";

const SignUp = () => {
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [error, seterror] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //axios
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
      });
      seterror(null)
      console.log(res);
    } catch (e) {
      console.log(e.message);
      seterror("User already exixts!");
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-300 justify-center p-6"
      >
        <Heading Text="SIGNUP" className="m-2 font-extrabold " />
        <Inputbox
          placeholder="john"
          type="tet"
          value={setuser.firstname}
          onChange={(event) =>
            setuser({
              ...user,
              firstname: event.target.value,
            })
          }
        />
        <Inputbox
          placeholder="cena"
          type="text"
          value={setuser.lastname}
          onChange={(event) =>
            setuser({
              ...user,
              lastname: event.target.value,
            })
          }
        />
        <Inputbox
          placeholder="abc@xyx.com"
          type="email"
          value={setuser.username}
          onChange={(event) =>
            setuser({
              ...user,
              username: event.target.value,
            })
          }
        />
        <Inputbox
          placeholder="Password"
          type="password"
          value={setuser.password}
          onChange={(event) =>
            setuser({
              ...user,
              password: event.target.value,
            })
          }
        />
        {error && <p className="text-red-600">{error}</p>}{" "}
        {/* Display error messages */}
        <button
          type="submit" // Change to submit for form submission
          className="font-semibold bg-green-500 border-3 hover:bg-green-700 mt-6"
        >
          Sign Up
        </button>
        <Footertext buttonText="Login" Text="Already have an account?" />
      </form>
    </div>
  );
};

export default SignUp;
