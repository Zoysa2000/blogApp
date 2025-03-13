import React from "react";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Logincontext } from "../Context/Logincontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Userbtn()
{
  const navigate=useNavigate();
  const {userInfo}=useContext(Logincontext);
  const[show,setShow]=useState(false);
  if (userInfo) {
    localStorage.setItem("username", userInfo.username);
  }
  const username = localStorage.getItem("username");

  const handleDocument=()=>
  {
  navigate("/Documentation", { replace: true });
  }

  const handleShowblog=()=>
  {
    navigate("/Showblog", { replace: true }); 
  }
  const handleMyblogs=()=>
  {
    navigate("/Blogs", { replace: true });  
  }
  const handleLogout=()=>
  {
    setShow(true)
    setTimeout(()=>
    {
      setShow(false)
    navigate("/", { replace: true });
    },5000)  
  }
return(
  <>
  <div className="container-button dropup">
  <Button style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}  className="fixed-button  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
   <FaUserCircle size={30}/>&nbsp; {username}
  </Button>
  <ul className="dropdown-menu p-2">
   <Button className=" w-100" style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}} onClick={handleDocument}>About App</Button>
   <Button className="mt-2  w-100" style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}onClick={handleMyblogs}>My Blogs</Button>
   <Button className="mt-2  w-100" style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}onClick={handleShowblog}>Blogs</Button>
   <Button className="mt-2  w-100" style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}} onClick={handleLogout}>Log out</Button>
  </ul>
  {show &&(
  <div className="spinner-border mt-2 mb-2" role="status" style={{color:"#2AAA8A",display: 'block', margin: 'auto'}}>
  <span className="visually-hidden">Loading...</span>
  </div>  
  )}
</div>
</>
    )
}

export default Userbtn;