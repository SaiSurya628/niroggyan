import { BsTelephone } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link ,Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";


const History=(props)=>{
        const [user, setUser] = useState("");
        const [tests, setTests] = useState([]);
        const [diseaseDescription, setDiseaseDescription] = useState("");
        const [diseaseTips, setDiseaseTips] = useState([]);
        const [diseaseHeading,setDiseaseHeading]=useState("");
        const [Image,setImage]=useState("")
      
        useEffect(() => {
          data();
        }, []);
      
 const data = async () => {
          const{id}=props
          const response = await axios.get(`http://localhost:5000/smart-report/${id}`);
          setUser(response.data.user);
          setTests(response.data.tests);
          console.log(JSON.parse(localStorage.getItem(`history-${id}`)))
      
          // Set disease description and tips based on user's disease
          const disease = response.data.user.disease;
          if (disease === "cancer") {
            setDiseaseHeading("Cancer Screening")
            setImage("https://st2.depositphotos.com/5398292/8972/v/600/depositphotos_89720090-stock-illustration-breast-cancer-awareness.jpg")
            setDiseaseDescription("Preventive cancer screening checks for the signs of cancer in healthy individuals and in individuals without any symptoms of cancer. Screening can help doctors find and treat several types of cancer early, before the onset of symptoms and before it is too late for the curative treatment. Early detection is important because when abnormal tissue or cancer is found early, it may be easier to treat.Cancer cells grow and divide in an uncontrolled manner forming a tumor (lump), invading normal tissues and important organs and thus interfering with the important body functions. If left untreated, cancer cells from a tumour can come into blood and with blood circulation, cancer can eventually spread throughout the body.");
            setDiseaseTips(["Resveratrol which is present in grapes, peanuts and berries is a natural anti-cancer.", "Stay away from tobacco products-Smoking is primary cause of lung cancer.", "Limit your alcohol consumption. Alcohol use is associated with cancer of the digestive tract, oral cavity, liver, pancreas, larynx (voice bax), breast and colon."]);
          } else if (disease === "lipid") {
            setDiseaseHeading("Lipid Profile");
            setImage("https://files.gandi.ws/93/96/93961095-db76-4ba0-a7b1-7994110331dd.jpg");
            setDiseaseDescription("This profile helps detect imbalance of lipids such as cholesterol, HDL cholesterol etc if left untreated it increase the risk of cardiovascular disease");
            setDiseaseTips(["the elderly are suscpectible to heart disease", "heart disease can be genetic", "high bp leads to heart disease"]);
          } else if (disease === "kidney") {
            setDiseaseHeading("Kidney")
            setImage("https://img.freepik.com/premium-vector/kidney-healthy-care-logo-design_23987-700.jpg?w=2000")
            setDiseaseDescription("The kidneys are vital organs responsible for filtering waste products, excess water, and toxins from the bloodstream, helping maintain fluid balance and regulate blood pressure");
            setDiseaseTips(["Maintain a healthy and balanced diet low in sodium, processed foods, and excessive protein, while incorporating fresh fruits", "Avoid smoking and limit alcohol consumption, as these habits can put additional strain on the kidneys and contribute to kidney damage over time", "Stay hydrated by drinking an adequate amount of water throughout the day to support optimal kidney function and promote the flushing out of waste products"]);
          } else if (disease === "thyroid") {
            setDiseaseHeading("thyroid")
            setImage("https://cdn2.vectorstock.com/i/1000x1000/86/71/human-thyroid-icon-in-black-style-isolated-vector-12728671.jpg")
            setDiseaseDescription("The thyroid is a small butterfly-shaped gland located in the front of the neck that plays a crucial role in regulating metabolism and producing hormones that control various bodily functions");
            setDiseaseTips(["Eat a balanced diet rich in iodine, selenium, and vitamin D to support thyroid function", "Manage stress levels through relaxation techniques like yoga or meditation, as stress can impact thyroid health.", "Regularly monitor thyroid hormone levels and consult with a healthcare professional for proper diagnosis and treatmen"]);
          } else if (disease === "diabetes") {
            setDiseaseHeading("Diabetes")
            setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYBljq8aYSxkItwDyg_5o7Prp1wo-nJ_FE-Qioy-NHw&s");
            setDiseaseDescription("Diabetes is a chronic metabolic disorder characterized by high blood sugar levels. It occurs when the body either doesn't produce enough insulin or cannot effectively use the insulin it produces. Insulin is a hormone produced by the pancreas that regulates blood sugar levels and allows cells to utilize glucose for energy");
            setDiseaseTips(["Maintain a balanced diet with portion control, emphasizing whole grains, lean proteins", "Engage in regular physical activity, such as walking, cycling, or swimming, to help control blood sugar levels and improve insulin sensitivity", "Monitor blood glucose levels regularly and work with healthcare professionals to develop a personalized diabetes management plan"]);
          }
        };
      
        const Authentication = Cookies.get('jwtToken')
        if (Authentication === undefined) {
          return <Navigate to="/" />
        }
      
        return (
          <div className="first">
            <div className="smart-main-container">
              <div className="second-container">
                <Link to="/userhealth-report">
                <img
                  alt="logo"
                  className="logo-image"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa9PZyfJKml9JDvd8sLsEJOGm37GFc2b4oNB1BdPFQ1A&s"
                /></Link>
                <h1 className="heading">
                  niroggyan <br />
                  <span className="span">Smart Report, Smart You</span>
                </h1>
              </div>
              <div>
                <div className="icon-container">
                  <BsTelephone className="icon-phone" />
                  <span className="text">+91 6281140805</span>
                </div>
                <div className="icon-container">
                  <TiContacts className="icon-phone" />
                  <span className="text">contact@niroggyan.com</span>
                </div>
                <div className="icon-container">
                  <AiOutlineGlobal className="icon-phone" />
                  <span className="text">www.noriggyan.com</span>
                </div>
              </div>
            </div>
            <hr className="horizontal" />
            <div className="user-details">
              <div>
                <p>Name</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p>Basic Info</p>
                <p>{user.gender} | {user.age} years</p>
              </div>
              <div>
                <p>Date</p>
                <p>{new Date(Date.now()).toLocaleDateString("en-GB")}</p>
              </div>
            </div>
            <hr className="horizontal" />
            
            <div className="description-container">
              <img className="image" alt={diseaseHeading} src={Image} />
              <div>
              <h2>{diseaseHeading}</h2>
              <p>{diseaseDescription}</p>
              </div>
            </div>
            <div className="button-container"> 
             <div>
              <button className="box1">Normal</button>
              <button className="box2">Abnormal</button>
              <button className="box3">Borderline</button>
             </div>
            </div>
            <table className="test-results">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test, index) => (
                  <tr key={index}>
                    <td className={test.range}>{test.testName}</td>
                    <td className={test.range}>{test.result}</td>
                    <td>
                      <div className="range-bar">
                        <div
                          className={`range-indicator ${test.range}`}
                        />
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>      
            <div className="tips-container">
              {user.disease==="lipid"?<button>Risk Factors :</button>:<button>Tips :</button>}
              <ul>
                {diseaseTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div  className="paragraph">
            <span>Powered by niroggyan</span>
            <img
                  alt="logo"
                  className="final-logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa9PZyfJKml9JDvd8sLsEJOGm37GFc2b4oNB1BdPFQ1A&s"
                />
                </div>
          </div>
        );
      };
      
     
    

export default History   