import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import axios from "axios";

import "./index.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();

  const userFunction = (event) => {
    setUsername(event.target.value);
  };

  const passwordFunction = (event) => {
    setPassword(event.target.value);
  };

  const passwordFunction2 = (event) => {
    setPassword2(event.target.value);
  };

  const submitFunction = async (event) => {
    event.preventDefault();
    try {
      if (password !== "" && password2 !== "" && password !== password2) {
        setPasswordError(true);
      } else {
        await axios.post("http://localhost:5000/signup", {
          username,
          password,
        });
        setPasswordError(false)
        history("/");

      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.error); // Extract the error message
    }
  };

  return (
    <div>
      <div className="main">
        <form onSubmit={submitFunction}>
          <div className="design">
            <BiUser className="icon" />
          </div>
          <h1 className="head">Welcome!</h1>

          <p>
            Create an account from here. <br />
            Please enter your details to continue.
          </p>

          <br />
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={userFunction}
            value={username}
            required
          />
          <br />
          <br />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={passwordFunction}
            value={password}
            required
          />
          <br />
          <input
            className="password-input"
            type="password"
            id="password2"
            placeholder="Confirm Password"
            onChange={passwordFunction2}
            value={password2}
            required
          />
          <br />
          {passwordError ? (
            <p className="error-para">confirm Password must match</p>
          ) : null}

          <button className="button-signup" type="submit">Create Account</button>
          {error ? <p className="error-para">{errorMessage}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
