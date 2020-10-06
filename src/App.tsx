import React from 'react';
import './App.css';
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap'
import Home from './components/Home/home'
import { store,selectScreen,setPersonalInfo, setDob } from "./redux/reducer"
import PersonalInfo from './components/PersonalInfo/personalInfo'
import { useSelector } from "react-redux"
import Dob from './components/Dob/dob'
import Agreements from './components/Agreements/agreements'



export interface reducerState{
  screenState:"home" | "personalInfo" | "dob" | "agreements";
  userState:
{checkedAgreements: Boolean
dob: string | null;
email: string | null;
firstName: string | null;
lastName: string | null;
}
}




function App() {



  const screen = useSelector<reducerState,"home" | "personalInfo" | "dob" | "agreements" >(state => state.screenState);

  
React.useEffect(()=>{

  
  let personalInfo = localStorage.getItem('personalInfo');
  let dob = localStorage.getItem('dob');
  let savedScreen = localStorage.getItem('screen');

 if ( savedScreen !==null && savedScreen !== undefined){
  let jsonData = JSON.parse(savedScreen);  
  store.dispatch(selectScreen(jsonData))

 }

 
 if ( personalInfo !==null && personalInfo !== undefined){
  let jsonData = JSON.parse(personalInfo);  
  store.dispatch(setPersonalInfo(jsonData))

 }

 if ( dob !==null && dob !== undefined){
  let jsonData = JSON.parse(dob);  
  store.dispatch(setDob(jsonData))

 }
},[])

  

  return (
    
    <div className="App">

      <Header></Header>
  
      <Container>
  
     {screen === "home" &&  <Home/>}
    {screen === "personalInfo" && <PersonalInfo/>}
    {screen === "dob" && <Dob/>}
    {screen === "agreements" && <Agreements/>}
    

      </Container>
    </div>
  
  );
}

export default App;
