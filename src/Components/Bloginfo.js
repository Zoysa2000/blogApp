import React from "react";
import { useContext } from "react";
import { BlogIdcontext } from "../Context/BlogIdcontext";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Backblogs from "./Backblogs";
import { Button } from "react-bootstrap";
import { MdOutlineReviews } from "react-icons/md";

import EditPopup from "../SubComponet/Editpopup";
function Bloginfo()
{
    const [ratingsSum, setRatingsSum] = useState({});
    const {BlogId}=useContext(BlogIdcontext);
    if(BlogId)
    {
    localStorage.setItem("BlogId", BlogId);
    }
    const blogId=localStorage.getItem("BlogId")

    const[blogInfo,setblogInfo]=useState({});
    const[blogComment,setblogComment]=useState([]);

    useEffect(()=>
    {
    axios.get(`http://localhost:5555/bloginfo/${blogId}`)
    .then((res)=>
    {
    setblogInfo(res.data.data.blog)
    })
    },)

    useEffect(()=>
    {
        axios.get(`http://localhost:5555/fetchComment/${blogId}`)
        .then((res)=>{
        setblogComment(res.data.data.userComments)  
        })    
    },)
    const removePTags = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
      };
      const formatDate = (originalDate) => {
        const dateObject = new Date(originalDate);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = dateObject.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
      };
      const sumRatings = (blogId) => {
        axios.get(`http://localhost:5555/ratevalue/${blogId}`)
          .then((res) => {
            const ratings = res.data.data.blogs.rate;
            const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);//calculate array elememnt
            setRatingsSum({ ...ratingsSum, [blogId]: sum+" "+"Star Points"});//store the blogID with sum in array
          })
          .catch((error) => {
          console.log(error);
          });
      };

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
    <div className="blog-item">
    <h1 style={{color:"#2AAA8A",fontFamily:'Noto Serif'}}>{blogInfo.title}</h1>
    <div className="p-3 mt-3 mb-3" style={{ boxShadow: '0 0 10px 0 #2AAA8A', borderRadius: '8px' }}>
    <img className="blog-picture" style={{width:"100%"}} src={`http://localhost:5555/${blogInfo?.imagePath}`} alt="blog" />
    <h5 style={{fontFamily:'Noto Serif'}} className="mt-3">Created date:-{formatDate(blogInfo?.date)}</h5>
    <div className="d-flex gap-2 mt-3">
    <Button onClick={() => sumRatings(blogInfo._id)} style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><MdOutlineReviews/>&nbsp;Blog Ratings</Button>
    <h4 className="mt-2" style={{color:"#ffb700",fontFamily:'Noto Serif'}}>{ratingsSum[blogInfo._id]}</h4>
   </div>
   <h3 className="mt-3" style={{color:"#2AAA8A",fontFamily:'Noto Serif'}}>Blog content</h3>
   <p className="content mt-2">{removePTags(blogInfo.content)}</p>
        <EditPopup content={removePTags(blogInfo.content)} blogId={blogInfo._id} />
   <div className="mt-3">
    <h3 style={{color:"#2AAA8A",fontFamily:'Noto Serif'}}>Readers comments</h3>
     <div className="row mt-2">
    {blogComment.map((index) => (
        <div className="col-12 col-md-6">
     <div className="card p-3 mb-2">
     <h5>
      <img style={{borderRadius: '50%', width: '70px', height: '70px'}} src="./user.png" alt="user"/>&nbsp;{index.username}
     </h5>
     <div>
       <span>{formatDate(index.date)}</span>
     </div>
     <div style={{textAlign:"justify"}}>{removePTags(index.comment)}</div>
   </div>
   </div>
  ))} 
    </div>
</div>
</div>
</div>
</div>
<Backblogs/>
    </>
 )
}

export default Bloginfo;