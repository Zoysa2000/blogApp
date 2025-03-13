import React from "react";
import { Button } from "react-bootstrap";
import { BsMagic } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';
import { useWindowSize } from "@react-hook/window-size";
import { SiOpenai } from "react-icons/si";
import Userbtn from "./Userbtn";
function Home()
{
  const [width, height] = useWindowSize();
    const navigate=useNavigate();
    const handleQuiz=()=>
    {
      navigate("/Quiz", { replace: true });
    }
    const handleImage=()=>
    {
      navigate("/Image", { replace: true });
    }
    const handleSpeech=()=>
    {
      navigate("/Describe", { replace: true });
    }
    const handleChat=()=>
    {
      navigate("/Chat", { replace: true });
    }
 
    return(
        <>
      <div className=" card-components container" >
      <div class="custom-shape-divider-top-1705863480">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
    </svg>
</div>
<h1 className="home-heading" style={{color:"#2AAA8A",fontFamily:'Noto Serif'}}>Try Your Favourite AI Tools with IntelleWave</h1>
  <h5>Powered by openAI <SiOpenai size={30}/></h5>
      <div className="row mt-4">
     <div className="col-12 col-md-6 mb-5">
    <div className="card"  style={{ boxShadow: '0 0 15px 0 #2AAA8A', borderRadius: '8px' }}>
   <h5 className="card-header">Quiz Bot</h5>
   <div className="card-body">
    <h5 className="card-title">Quiz Bot is answering any questions</h5>
    <p className="card-text">Intellewave, powered by OpenAI, features a quiz bot adept at answering any question, enhancing user experience with intelligent responses.</p>
    <Button onClick={handleQuiz} style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><BsMagic/>&nbsp;Try now</Button>
   </div>
  </div>
    </div>
    <div className="col-12 col-md-6 mb-5">
    <div className="card"  style={{ boxShadow: '0 0 15px 0 #2AAA8A', borderRadius: '8px' }}>
   <h5 className="card-header">Chat Bot</h5>
   <div className="card-body">
    <h5 className="card-title">You can friendly chat with Chat Bot</h5>
    <p className="card-text">Intellewave, powered by OpenAI, featuring a friendly chatbot for engaging and intuitive conversations. Simplifying interactions, enhancing user experience.</p>
    <Button onClick={handleChat} style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><BsMagic/>&nbsp;Try now</Button>
   </div>
  </div>
    </div>
    <div className="col-12 col-md-6 mb-5">
    <div className="card"  style={{ boxShadow: '0 0 15px 0 #2AAA8A', borderRadius: '8px' }}>
   <h5 className="card-header">Image Generator</h5>
   <div className="card-body">
    <h5 className="card-title">Image Generator is generating images</h5>
    <p className="card-text">Intellewave, powered by OpenAI, creating AI-generated images to enhance user experiences and content creation effortlessly.</p>
    <Button onClick={handleImage} style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><BsMagic/>&nbsp;Try now</Button>
   </div>
  </div>
    </div>
    <div className="col-12 col-md-6 mb-5">
    <div className="card"  style={{ boxShadow: '0 0 15px 0 #2AAA8A', borderRadius: '8px' }}>
   <h5 className="card-header">Topic Describer</h5>
   <div className="card-body">
    <h5 className="card-title">Describe your topics and create your own blogs</h5>
    <p className="card-text">Intellewave, powered by OpenAI, effortlessly describe topics and create personalized blogs post to read app users.</p>
    <Button onClick={handleSpeech} style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><BsMagic/>&nbsp;Try now</Button>
   </div>
  </div>
    </div>
    </div>
    <Confetti className="confetti-height"
  width={width}
  height={height}
  gravity={0.03}
  numberOfPieces={70}
 />
 <Userbtn/>
  </div>
 </>
    )
}
export default Home;