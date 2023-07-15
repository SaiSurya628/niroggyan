import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import './App.css';
import SignupPage from './components/SignupPage';
import EntryForm from './components/TestResultsFormPage';
import SmartReport from './components/SmartReportPage';
import RenderHistory from './components/RenderHistory';
import EditPage from './components/EditPage';


const App=()=>(
  <BrowserRouter>
  <div>
   
    <Routes>
    <Route exact path="/" element={<LoginPage/>}/>
      <Route exact path="/signup" element={<SignupPage/>}/>
      <Route exact path="/userhealth-report" element={<EntryForm/>}/>
      <Route exact path="/smart-report" element={<SmartReport/>}/>
      <Route exact path="/history" element={<RenderHistory/>}/>
      <Route exact path="/edit" element={<EditPage/>}/>
      
    </Routes>
  </div>
  </BrowserRouter>
)

export default App;
