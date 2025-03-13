import React from "react";
import { Button } from "react-bootstrap";
import { LuRefreshCw } from "react-icons/lu";
import { useState } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
import Back from "./Back";
function Image()
{
    const[prompt,setPromt]=useState('');
    const[response,setResponse]=useState('./wait.png');
    const[show,setShow]=useState(false);
    const[clean,setClean]=useState(false);
    const handleGenerate=()=>
    {
        setShow(!show)
        axios
        .post("http://localhost:5555/image", { prompt })
        .then((res) => {
        setResponse(res.data)
         setShow(false)
         toast.success("Please wait Image is loading...")
        setClean(true)
        })
        .catch((err) => {
        console.error(err);
        toast.error("Opps!")
        });    
    }
    const handleClean=()=>
    {
      setPromt('');
      setResponse('./wait.png');
      setClean(false);
    }
    
    return(
        <>
   <div className="container">
   <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
   <div className="card text-center col-12 col-md-5 mx-auto"  style={{ boxShadow: '0 0 15px #2AAA8A'}}>
   <div className="card-body">
   <img className="web-logo-register" src='./icon.png' alt="icon-img"/>
    <h3 className="card-title">IntelleWave Image Bot</h3>
    <input
    type="name"
    placeholder="Request image"
    className="input-field mt-3 w-100"
    onChange={(e)=>setPromt(e.target.value)}
    value={prompt}
     />
    <Button onClick={handleGenerate}  className="mt-3 w-100"  style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><LuRefreshCw/>&nbsp;Generate</Button>
    {show &&(
          <div className="spinner-border mt-4" role="status" style={{color:"#2AAA8A"}}>
          <span className="visually-hidden">Loading...</span>
        </div>  
        )}
   <img className="mt-3" style={{height:"350px",width:"100%"}} src={response} alt="GenerateImage"/>
       
   {clean &&(
      <Button onClick={handleClean} className="mt-3 w-100"  style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><RxOpenInNewWindow/>&nbsp;New Image</Button>
    )}   
    </div>
   </div>
</div>
<ToastContainer
     position='top-center'
     theme='light'
     autoClose={10000}
     pauseOnHover={false}
    hideProgressBar={false}
   closeOnClick={true}
    /> 
    <Back/> 
</div> 

        </>
    )
}

export default Image;