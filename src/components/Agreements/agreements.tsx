import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {Form,Jumbotron,Button} from 'react-bootstrap'
import './agreements.css'
import { useSelector } from "react-redux"
import {reducerState} from '../../App'
import {userState} from '../../redux/reducer'


export default function Agreements() {

  const reducer = useSelector<reducerState, userState>(state => state.userState);
  const [error,setError] = React.useState<string | null>(null);
  const [completed,setCompleted] = React.useState(false);


  const today = new Date();
  today.setHours(0, 0, 0, 0)


    const formik = useFormik({
        initialValues: {
        checkbox1: false,
        checkbox2: false
        
        },
        validationSchema: Yup.object({
          checkbox1: Yup.boolean()
          .oneOf([true], 'Must Accept Terms and Conditions'),
          checkbox2: Yup.boolean()
          .oneOf([true], 'Must Accept All Policies'),
      
        }),
        onSubmit: values => {

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({firstName : reducer.firstName, lastName : reducer.lastName, Email: reducer.email, dob: reducer.dob, agreement1: true, agreement2:true  })
        };

          fetch('https://5f7c019600bd74001690a208.mockapi.io/api/user', requestOptions)
          .then(response => response.json())
          .catch((err)=>{setError(err)})
          .then(data => {setCompleted(true)
            localStorage.removeItem("screen");
            localStorage.removeItem("dob");
            localStorage.removeItem("personalInfo");
          
          });
          
       
        }
        });
  

 return (

<Jumbotron className = "jumbotronAgreements">

{completed? <div>


<h2>Thank You for submitting the form</h2>

</div>:

<div>
  <h2>One last Step!</h2>
<form onSubmit={formik.handleSubmit}  noValidate  >


<Form.Check  className = "checkbox"
        type="checkbox"
        id="checkbox1"
        name = "checkbox1"
        label= "I agree to all the terms and conditions."
        isInvalid = {!!formik.errors.checkbox1 && !!formik.touched.checkbox1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        feedback = {formik.errors.checkbox1}
       ></Form.Check>



<Form.Check  className = "checkbox"
        type="checkbox"
        id="checkbox2"
        name = "checkbox2"
        label= "I agree to all the policies."
        isInvalid = {!!formik.errors.checkbox2 && !!formik.touched.checkbox2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        feedback = {formik.errors.checkbox2}

       ></Form.Check>


<Button type = "submit">Submit</Button>
            
 </form>

 <p className = "error">{error}</p>
 </div>
}
            
 </Jumbotron>
      

 
)
}
