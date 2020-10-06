import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {Form,Jumbotron,Button} from 'react-bootstrap'
import './dob.css'
import { store,selectScreen, setDob } from "../../redux/reducer"
import { useSelector } from "react-redux"
import {reducerState} from '../../App'
import {userState} from '../../redux/reducer'


export default function Dob() {

  const {dob} = useSelector<reducerState,userState >(state => state.userState);


  const today = new Date();
  today.setHours(0, 0, 0, 0)


    const formik = useFormik({
        initialValues: {
        dob: dob
        
        },
        validationSchema: Yup.object({
          dob: Yup.date()
            .required('Required').nullable()
            .max(today, 'Date of birth cannot be in the future'),
      
        }),
        onSubmit: values => {

          store.dispatch(setDob(values.dob))
          localStorage.setItem("dob",JSON.stringify(values.dob));
          localStorage.setItem("screen",JSON.stringify("agreements"));
          store.dispatch(selectScreen("agreements"))
       
        }
        });
  

 return (

<Jumbotron className = "jumbotronDob">

  <h2>Date of Birth</h2>
<form onSubmit={formik.handleSubmit}  noValidate  >

<Form.Group controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control 
          type="date" 
          isInvalid={!!formik.errors.dob}
          onChange={formik.handleChange}
          name="dob"
          onBlur={formik.handleBlur}
          autoFocus
          value = {formik.values.dob === null ? "" : formik.values.dob}
          />
        <Form.Control.Feedback type = "invalid">{ formik.errors.dob}</Form.Control.Feedback>
      
        </Form.Group>
<Button type = "submit">Continue</Button>
            
 </form>
            
 </Jumbotron>
      

 
)
}
