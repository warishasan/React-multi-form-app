import React from 'react';
import { Button } from 'react-bootstrap';
import './home.css'
import { store,selectScreen } from "../../redux/reducer"



export default function Home() {

 return (

<div className = "homeContainer">

<h1 >Welcome to React Test Application</h1>
<Button onClick = {()=>{store.dispatch(selectScreen("personalInfo"))
                  localStorage.setItem("screen",JSON.stringify("personalInfo"));}} >Apply now</Button>

 </div>
)
}
