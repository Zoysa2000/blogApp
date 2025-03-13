import React from "react";
import Back from "./Back";
import Comment from "./Comment";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
function Document()
{
    const[comment,setComment]=useState([]);
    useEffect(()=>
    {
    axios.get("http://localhost:5555/getComment")
    .then((res)=>
    {
      const fetchedComments = res.data.data.userComments
      setComment(fetchedComments);
    })
    .catch((error)=>
    {
    console.log(error)
    })

    },[])
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
    <div className="document">
      <h2 style={{color:"#2AAA8A"}}>What is IntelleWave?</h2> 
      <p style={{textAlign:"justify"}}>Intellewave, a cutting-edge web application, seamlessly integrates the powerful capabilities of OpenAI to revolutionize your digital experience with just a touch. This multifaceted platform boasts a suite of intelligent features, combining the prowess of ChatGPT with a diverse array of functionalities. With Intellewave, you can effortlessly engage in dynamic conversations through its advanced chatbot, navigate 
        intriguing quizzes through the quiz bot, and unleash creativity with an innovative image generator. Elevating user interaction to new heights, it also excels as a topic describer, providing insightful and articulate descriptions on a myriad of subjects. By harnessing the power of OpenAI, Intellewave transforms the conventional into the extraordinary, delivering a comprehensive and user-friendly solution for individuals seeking a seamless fusion of chatbot services, interactive quizzes, image generation, and topic elucidation—all at your fingertips. Welcome to the future of interactive, intelligent web applications with Intellewave.</p> 
    </div>
    
    <div className="mt-3">
      <h2 style={{color:"#2AAA8A"}}>IntelleWave users feedback</h2> 
      <p style={{textAlign:"justify"}}>IntelleWave users consistently express high levels of satisfaction with the application, praising its intuitive interface and robust functionality. Users appreciate the seamless navigation and user-friendly design, making it easy for both novice and experienced individuals to leverage openAI features. 
      The platform's ability to streamline complex tasks has been particularly lauded, saving users valuable time and enhancing overall productivity. </p> 
      </div>

      <div className="row">
      <div className="col-12 col-md-7 mt-2">
      <Comment/>
      </div>
        <div className="col-12 col-md-5 mt-3">
        <h3 style={{color:"#2AAA8A"}}>Comments of IntelleWave users</h3> 
  {comment.map((commentArray) => (
    <div>
      {commentArray.map((comment) => (
        <div className=" mt-3">
          <div className=" mb-2">
            <h5>
             <img style={{borderRadius: '50%', width: '70px', height: '70px'}} src="./user.png" alt="user"/>&nbsp;{comment.commentUser}
            </h5>
            <div>
              <span>{formatDate(comment.date)}</span>
            </div>
            <div style={{textAlign:"justify"}}>{removePTags(comment.comment)}</div>
          </div>
        </div>
      ))}
    </div>
  ))} 
   </div>
</div>
</div>
<Back/>

 </>
    )
}

export default Document;