import React from "react";
import JoditEditor from "jodit-react";
import { Button } from "react-bootstrap";
import { TfiWrite } from "react-icons/tfi";
import { useState } from "react";
import axios from "axios";
import { Logincontext } from "../Context/Logincontext";
import { useContext } from "react";
import Back from "./Back";
function Blogcreate()
{
    const [image, setImage] = useState()
    const[comment,setComment]=useState()
    const[title,setTitle]=useState()
    const[response,setResponse]=useState()
    const[show,setShow]=useState(false);
    const {userInfo}=useContext(Logincontext);
    if (userInfo) {
      localStorage.setItem("username", userInfo.username);
    }
    const username = localStorage.getItem("username");
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
      };
      const handleEditorChange = (content) => {
        setComment(content);
      };

      const handlePost=async()=>{
        try {
          const formData = new FormData()
          formData.append('username',username)
          formData.append('title',title)
          formData.append('content',comment)
          formData.append('imagePath', image)
         
          axios.post('http://localhost:5555/blogs',formData )
          .then((res)=>
          {
          if(res.data.message)
          {
          setShow(true)
          setTimeout(()=>
          {
          setResponse(res.data.message)
          setShow(false)
          setComment('')
          setTitle('')
          setImage('')
          },5000)
          }
          else{
            setResponse(res.data.errormessage)
          }
          })
    
        } catch (error) {
          console.error("Error creating blog:", error);
        }

      }
    return(
        <>
    <div className="container">
    <div class="custom-shape-divider-top-1705863480">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
    </svg>
   </div>
   <div className="create-section p-3 mb-3" style={{ boxShadow: '0 0 15px 0 #2AAA8A', borderRadius: '8px' }}>
   <h2 style={{display:"flex",alignItems:"center",justifyContent:"center",color:"#2AAA8A",fontFamily:'Noto Serif'}}><TfiWrite size={40}/>&nbsp;Create My Blog</h2>
   <input
    type="text"
    placeholder="Blog Title"
    className="input-field mt-3 w-100 p-2"
    onChange={(e)=>setTitle(e.target.value)}
    />
    
    {image && <img className="w-100 mt-3" src={URL.createObjectURL(image)} alt="Uploaded" style={{maxHeight: '600px' }} />}
     <input className="mt-3" type="file" onChange={handleImageChange} />
     <JoditEditor className="mt-3"
      value={comment}
      onChange={handleEditorChange}
     />
     <div className="mt-3 mb-3">
     <Button onClick={handlePost} style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}>Post My Blog</Button>
     </div>
     {show &&(
          <div className="spinner-border mt-2 mb-2" role="status" style={{color:"#2AAA8A",display: 'block', margin: 'auto'}}>
          <span className="visually-hidden">Loading...</span>
        </div>  
        )}
    <p style={{color:"#2AAA8A",fontWeight:"600"}}>{response}</p>
     </div>
     <Back/>
   </div> 
        </>
    )
}

export default Blogcreate;