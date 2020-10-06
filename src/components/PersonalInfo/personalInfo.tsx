import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {Form,Row,Col,Jumbotron,Button} from 'react-bootstrap'
import './personalInfo.css'
import { store,selectScreen,setPersonalInfo } from "../../redux/reducer"
import { useSelector } from "react-redux"
import {reducerState} from '../../App'
import {userState} from '../../redux/reducer'

export default function PersonalInfo() {


  const {firstName, lastName, email} = useSelector<reducerState,userState >(state => state.userState);


    const formik = useFormik({
        initialValues: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        
        },
        validationSchema: Yup.object({
          firstName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required').nullable(),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required').nullable(),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required').nullable(),
        }),
        onSubmit: values => {
          store.dispatch(setPersonalInfo({firstName: values.firstName,lastName: values.lastName, email: values.email}))
          localStorage.setItem("personalInfo",JSON.stringify({firstName: values.firstName,lastName: values.lastName, email: values.email}));
          localStorage.setItem("screen",JSON.stringify("dob"));
          store.dispatch(selectScreen("dob"))
        
        }
        });
  

 return (

<Jumbotron className = "jumbotronPersonalInfo">

  <h2>Personal Information</h2>
<form onSubmit={formik.handleSubmit}  noValidate  >
      
<Row >
      
      <Col md = {6} sm = {true}>
          <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
          type="text" 
          isInvalid={!!formik.errors.firstName}
          onChange={formik.handleChange}
          name="firstName"
          onBlur={formik.handleBlur}
          autoFocus
          />
        <Form.Control.Feedback type = "invalid">{ formik.errors.firstName}</Form.Control.Feedback>
      
        </Form.Group>
        </Col>
        <Col  md = {6} sm = {true}  >
      
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
          type="text" 
          isInvalid={!!formik.errors.lastName && !!formik.touched.lastName}
          onChange={formik.handleChange}
          name="lastName"
          onBlur={formik.handleBlur}
          />
        <Form.Control.Feedback type = "invalid">{ formik.errors.lastName}</Form.Control.Feedback>
      
        </Form.Group>
        </Col>
        </Row >

        
        <Row  >
          <Col md = {12} sm = {true}  >
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          type="email" 
          isInvalid={!!formik.errors.email && !!formik.touched.email}
          onChange={formik.handleChange}
          name="email"
          onBlur={formik.handleBlur}
          />
        <Form.Control.Feedback type = "invalid">{ formik.errors.email}</Form.Control.Feedback>
      
        </Form.Group>
        </Col>
        </Row>


        <Button type = "submit">Continue</Button>
            
 </form>
            
 </Jumbotron>
      

 
)
}
