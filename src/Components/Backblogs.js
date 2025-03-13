import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Backblogs()
{
    const navigate=useNavigate();
const handleBack=()=>
{
    navigate("/Blogs", { replace: true });
}
    return(
        <>
 <div className="container-button">
      <Button style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}} onClick={handleBack} className="fixed-button"><IoChevronBackOutline size={25}/>Back</Button>
    </div>
    </>
    )
}

export default Backblogs;