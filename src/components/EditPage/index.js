import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate,Navigate } from "react-router-dom";

const EditPage = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [errorMessage, setMessage] = useState("");
  const [errorStatus, setError] = useState(false);
  const history = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("edit"));
    console.log(userData);
    try {
      const formData = {
        name: userInput.name,
        age: userInput.age,
        gender: userInput.gender,
      };
      const response = await axios.put(
        `http://localhost:5000/edit/${userData.id}`,
        formData
      );
      console.log("edited", response.data);
      history("/smart-report");
    } catch (error) {
      setError(true);
      setMessage(error.message);
      console.log(error.message, "error");
    }
  };
  const Authentication = Cookies.get('jwtToken')
  if (Authentication === undefined) {
    return <Navigate to="/" />
  }
  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/userhealth-report">
            <img
              alt="logo"
              className="logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa9PZyfJKml9JDvd8sLsEJOGm37GFc2b4oNB1BdPFQ1A&s"
            />
          </Link>
          <h1 className="heading">
            niroggyan <br />
            <span className="span">Smart Report, Smart You</span>
          </h1>
        </div>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="input"
            value={userInput.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            className="input"
            value={userInput.age}
            onChange={handleInputChange}
            placeholder="Enter age"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={userInput.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
        {errorStatus ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
};

export default EditPage;
