import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Update state name to errorMessage

  const history = useNavigate();

  const userFunction = (event) => {
    setUsername(event.target.value);
  };

  const passwordFunction = (event) => {
    setPassword(event.target.value);
  };

  const submitFunction = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const { jwtToken } = response.data;
      console.log(jwtToken)
      Cookies.set("jwtToken", jwtToken);
      localStorage.setItem("userdetails", username);
      history("/userhealth-report");
    } catch (error) {
      setError(true);
      console.log(error.response.data.error)
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
            Let's connect to your space. <br />
            Please enter your details to continue.
          </p>

          <br />
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={userFunction}
            value={username}
          />
          <br />
          <br />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={passwordFunction}
            value={password}
          />
          <br />
          <Link to="/signup">
            <p className="para">create account</p>
          </Link>
          <button className="button" type="submit">Log In</button>
          {error ? <p className="error-para">{errorMessage}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
