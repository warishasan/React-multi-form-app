import React from 'react';
import { Navbar, ProgressBar } from 'react-bootstrap';
import { useSelector } from "react-redux"
import {reducerState} from '../App'

export default function Header() {

  const screen = useSelector<reducerState,"home" | "personalInfo" | "dob" | "agreements" >(state => state.screenState);

  const [progressbar,setProgressBar] = React.useState(0);

  React.useEffect (()=>{

    if (screen === "home"){

      setProgressBar(0)
    }
  
    if (screen === "personalInfo"){
  
      setProgressBar(33)
    }
  
    if (screen === "dob"){
  
      setProgressBar(67)
    }
  
    if (screen === "agreements"){
  
      setProgressBar(100)
    }

  },[screen])

    return (
<div>
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Test Website</Navbar.Brand>
</Navbar>
<ProgressBar now={progressbar} />
</div>
)
}
