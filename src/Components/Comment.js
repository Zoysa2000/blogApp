import React from "react";
import JoditEditor from "jodit-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Logincontext } from "../Context/Logincontext";
import { useContext } from "react";

function Comment()
{
    const[comment,setComment]=useState("")
    const[show,setShow]=useState(false)
   const[message,setMessage]=useState("")
   const {userInfo}=useContext(Logincontext);
   const userId=userInfo._id;
   const userName=userInfo.username;
   if(userId)
   {
   localStorage.setItem("userId",userId)
   }
   if(userName)
   {
   localStorage.setItem("userName",userName)
   }
   const userid=localStorage.getItem("userId")
   const Myusername=localStorage.getItem("userName")
    const handleComment=()=>
    {
    axios.post("http://localhost:5555/addComment", {"userId":userid,"comment":comment,"username":Myusername})
    .then((res)=>
    {
    setShow(true)
    setTimeout(()=>
    {
    setShow(false)
    setMessage(res.data.message)
    setComment("")
    },5000)
    })
    .catch((error)=>
    {
    console.log(error)
    setComment("Not add")
    })
    }
    const handleEditorChange = (content) => {
        setComment(content);
      };
    return(
    <>
    <div className="comment-section p-2" style={{ boxShadow: '0 0 15px 0 #2AAA8A', borderRadius: '8px' }}>
     <JoditEditor className="mt-3"
     value={comment}
     onChange={handleEditorChange}
     />
     <div className="d-flex gap-2 mt-3 mb-3">
     <Button onClick={handleComment} style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}>Post comment</Button>
     </div>
     <p style={{color:"#2AAA8A"}}>{message}</p>
     {show &&(
          <div className="spinner-border mt-2 mb-2" role="status" style={{color:"#2AAA8A",display: 'block', margin: 'auto'}}>
          <span className="visually-hidden">Loading...</span>
        </div>  
        )}
     </div>
     </>
    )
}

export default Comment;