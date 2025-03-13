import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PiTrademarkRegistered } from "react-icons/pi";
import { AiOutlineLogin } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register()
{
  const navigate=useNavigate();
    const[showAlert,setAlert]=useState(false);
    const[alertColor,setColor]=useState("")
    const[showLogin,setLogin]=useState(false);
    const[show,setShow]=useState(false);
    const [response,setResponse]=useState("")
    const[formValues,setValues]=useState({
       username:"",
       password:"",
       confirmPassword:"",
       email:""
       })
    const handleInputChange=(fieldName,value)=>
    {
      setValues({ ...formValues, [fieldName]: value });//single state
      formik.handleChange(fieldName)(value);
    }
    const formik = useFormik({
        initialValues: formValues,
        validationSchema: Yup.object({
          username:Yup.string()
          .required("Required this field"),
          password:Yup.string()
          .required("Required this field")
          .min(8, "Password must be at least 8 characters long"),
          confirmPassword:Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required("Required this field"),
          email:Yup.string()
          .required("Required this field")
          .email("Invalid email address"),
        }),
        onSubmit:() => {
        axios.post("http://localhost:5555/register", formValues)
        .then((res)=>
        {
          if(res.data.donemessage)
          {
            setResponse(res.data.donemessage)
            setColor("#2AAA8A")
            setShow(true)
            setTimeout(() => {
            setAlert(true);
            setLogin(true);
            setShow(false);
          }, 5000);
          }
          else{
            setResponse(res.data.alertmessage)
            setColor("#FF0000") 
            setShow(true)
            setTimeout(() => {
            setAlert(true);
            setShow(false);
          }, 5000);
          }
        })
        .catch(()=>
        {
        setResponse("cant fetch data body")
        setColor("#FF0000")
        })
  },
  });
  const handleLogin=()=>
  {
    navigate("/Login", { replace: true });
  }
    return(
    <>
    <div className="container">
   <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
   <div className="card text-center col-12 col-md-5 mx-auto" style={{ boxShadow: '0 0 15px 0 #2AAA8A', borderRadius: '8px' }}>
   <div className="card-body">
   <img className="web-logo-register" src='./icon.png' alt="icon-img"/>
   <form onSubmit={formik.handleSubmit}>
        <input
        className="input-field mt-3 w-100"
          type="text"
          onChange={(e) => handleInputChange('username', e.target.value)}
          onBlur={formik.handleBlur}
          placeholder="Username"
        />
        {formik.touched.username && formik.errors.username ? (
          <div style={{color:"red"}}>{formik.errors.username}</div>
        ) : null}
        <input
        className="input-field mt-3 w-100"
          type="password"
          onChange={(e) => handleInputChange('password', e.target.value)}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password? (
          <div style={{color:"red"}}>{formik.errors.password}</div>
        ) : null}
          <input
        className="input-field mt-3 w-100"
          type="password"
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          onBlur={formik.handleBlur}
          placeholder="Confirmpassword"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div style={{color:"red"}}>{formik.errors.confirmPassword}</div>
        ) : null}
        <input
        className="input-field mt-3 w-100"
          type="email"
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{color:"red"}}>{formik.errors.email}</div>
        ) : null}
      <Button  type="submit" className="mt-3 w-100 mb-2" style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><PiTrademarkRegistered size={25}/>&nbsp;Register IntelleWave</Button>
      </form>
      {show &&(
          <div className="spinner-border mt-2" role="status" style={{color:"#2AAA8A"}}>
          <span className="visually-hidden">Loading...</span>
        </div>  
        )}
      {showAlert &&(
         <div className="w-100 mt-2 p-2" style={{height:"auto",border:"1px solid",borderColor:`${alertColor}`}}>
            <p style={{color:`${alertColor}`,fontWeight:"600",textAlign:"center"}}>{response}</p>
            </div>
            )}
            {showLogin &&(
             <Button onClick={handleLogin}  className="mt-3 w-100 mb-2" style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><AiOutlineLogin size={25}/>&nbsp;Login IntelleWave</Button>    
            )}
    </div>
   </div>
</div>
<div class="custom-shape-divider-bottom-1706888061">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
    </svg>
</div>
</div>
</>
    )
}

export default Register;