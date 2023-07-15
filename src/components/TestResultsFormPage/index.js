import React, { useState } from 'react';
import { Link,  useNavigate,Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import axios from 'axios';
import './index.css';


const EntryForm = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [errorMessage,setErrorMessage]=useState("");
  const [status,setStatus]=useState(false)
  const [resultObject, setResultObject] = useState({ testName: '', result: '', range: '' });
  const [userInput, setUserInput] = useState({
    name: '',
    age: '',
    gender: '',
  });
  const [submitted, setSubmitted] = useState(false);
const history=useNavigate();
  const diseaseOptions = [
    {
      label: 'Lipid',
      value: 'lipid',
      tests: [
        { name: 'Total Cholesterol' },
        { name: 'HDL Cholesterol' },
        { name: 'LDL Cholesterol' },
      ],
    },
    {
      label: 'Cancer',
      value: 'cancer',
      tests: [
        { name: 'CA-125' },
        { name: 'Prostate Specific Antigen Total' },
      ],
    },
    {
      label: 'Diabetes',
      value: 'diabetes',
      tests: [
        { name: 'Fasting Blood Sugar' },
        { name: 'Hemoglobin A1c' },
      ],
    },
    {
      label: 'Thyroid',
      value: 'thyroid',
      tests: [
        { name: 'TSH (Thyroid-Stimulating Hormone)' },
        { name: 'Free T4' },
      ],
    },
    {
      label: 'Kidney',
      value: 'kidney',
      tests: [
        { name: 'Creatinine' },
        { name: 'Blood Urea Nitrogen (BUN)' },
      ],
    },
  ];

  const handleDiseaseChange = (event) => {
    if (!submitted) {
      setSelectedDisease(event.target.value);
    }
  };
  const historyFunction=()=>{
    history("/history")
  }

  const handleTestChange = (event) => {
    const selectedTest = event.target.value;
    if (!selectedTests.includes(selectedTest)) {
      setSelectedTests([...selectedTests, selectedTest]);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const addTestResult = () => {
    const newTestResult = selectedTests.map((each) => ({
      testName: each,
      result: resultObject.result,
      range: resultObject.range,
    }));
    setTestResults([...testResults, ...newTestResult]);
    setSelectedTests([]);
  };

  const handleResultChange = (event, index) => {
    const { value } = event.target;
    setResultObject({ ...resultObject, result: value });
  };

  const handleRangeChange = (event, index) => {
    const { value } = event.target;
    setResultObject({ ...resultObject, range: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    try {
      const formData = {
        name: userInput.name,
        age: userInput.age,
        gender: userInput.gender,
        disease: selectedDisease,
        tests: testResults,
      };

      const response=await axios.post('http://localhost:5000/userhealth-report', formData);

      console.log('Form submitted successfully');
      
      localStorage.setItem("id",response.data.message)
      history('/smart-report')
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message);
      console.log(error.message);
      setStatus(true)
    }
  };
const logoutFunction=()=>{
  console.log(Cookies.get("jwtToken"))
  Cookies.remove("jwtToken");
  history("/")
}
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
        <div>
        <button className='logout' onClick={logoutFunction}>Logout</button></div>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className='input'
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
            className='input'
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
        <div className="form-group">
          <label htmlFor="disease">Select Disease:</label>
          <select
            id="disease"
            value={selectedDisease}
            onChange={handleDiseaseChange}
            required
          >
            <option value="">Select disease</option>
            {diseaseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {selectedDisease && (
          <div className="form-group">
            <label htmlFor="test">Select Test:</label>
            <select id="test" value={resultObject.testName} onChange={handleTestChange}>
              <option value="">Select test</option>
              {diseaseOptions
                .find((option) => option.value === selectedDisease)
                .tests.map((test) => (
                  <option
                    key={test.name}
                    value={test.name}
                    disabled={selectedTests.includes(test.name)}
                  >
                    {test.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {selectedTests.length > 0 && (
          <div className="form-group">
            <label htmlFor="result">Result:</label>
            {selectedTests.map((test, index) => (
              <div key={index}>
                <label htmlFor={`result-${index + 1}`}>{test}</label>
                <input className='input'
                  type="number"
                  id={`result-${index + 1}`}
                  value={resultObject.result}
                  onChange={(event) => handleResultChange(event, index)}
                  placeholder="Enter result"
                />
                <select
                  value={resultObject.range}
                  onChange={(event) => handleRangeChange(event, index)}
                >
                  <option value="">Select range</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
            ))}
          </div>
        )}
        <div className='button-container'>
        <button className='button' type="button" onClick={addTestResult}>
          Add Test
        </button> 
        <button className='button' type="submit">Submit</button>
        <button className='button' onClick={historyFunction} type="button">History</button></div>
        
        {status?<p>{errorMessage}</p>:null}
      </form>
    </div>
  );
};

export default EntryForm;
