import React from "react";
import { Button } from "react-bootstrap";
import { IoCreateOutline } from "react-icons/io5";

function Blogbtn()
{

    const handleBlog=()=>
    {
    window.open("/Blog", "_blank");
    }
    return(
    <>
    <div className="Blogbtn">
    <Button onClick={handleBlog} style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><IoCreateOutline size={30}/>&nbsp;Create My Blog</Button>
    </div>
    </>
    )
}
export default Blogbtn;