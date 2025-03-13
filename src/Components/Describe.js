import React from "react";
import { useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { Button } from "react-bootstrap";
import { IoVolumeHighSharp } from "react-icons/io5";
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaRegPauseCircle } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Back from "./Back";
import Blogbtn from "./Blogbtn";

function Describe()
{
    const[show,setShow]=useState(false)
    const[prompt,setPromt]=useState('')
    const[response,setResponse]=useState('')
    const[speek,setSpeek]=useState(false)
    const [showMore, setShowMore] = useState(false)
    const[clean,setClean]=useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const handleGenerate=()=>
    {
    setShow(!show)
    axios
      .post("http://localhost:5555/describe", { prompt})
      .then((res) => {
        setResponse(res.data)
        setShow(false)
        setSpeek(true)
        setClean(true)
      })
      .catch((err) => {
        console.error(err)
      });
     
    }

    const handleSpeek=()=>
    {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      } else {
        const value = new SpeechSynthesisUtterance(response);
        window.speechSynthesis.speak(value);
      }
      setIsSpeaking(!isSpeaking);
    }
    const toggleShowMore = () => {
      setShowMore(!showMore);
    };
    const handleClean=()=>
    {
      setPromt('')
      setResponse('')
      setClean(false)
      setSpeek(false)
      setShow(false)
      setShowMore(false)
      window.speechSynthesis.cancel()
      setIsSpeaking(false)

    }

    return(
    <>
   <div className="container">
   <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
   <div className="card text-center col-12 col-md-5 mx-auto"  style={{ boxShadow: '0 0 15px #2AAA8A'}}>
   <div className="card-body">
   <img className="web-logo-register" src='./icon.png' alt="icon-img"/>
    <h3 className="card-title">IntelleWave Topic Describer</h3>
    <input
    placeholder="Give Topic"
    className="input-field mt-3 w-100"
    onChange={(e) => setPromt(e.target.value)}
    value={prompt}
></input>
    <Button onClick={handleGenerate} className="mt-3 w-100"  style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><LuRefreshCw/>&nbsp;Generate</Button>
    {show &&(
          <div className="spinner-border mt-4" role="status" style={{color:"#2AAA8A"}}>
          <span className="visually-hidden">Loading...</span>
        </div>  
        )}
        {speek &&(
      <Button onClick={handleSpeek} className="mt-3 w-100"  style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}>{isSpeaking ? <IoVolumeHighSharp /> : <FaRegPauseCircle/>}&nbsp;{isSpeaking ? 'Start speaking' : 'Pause speaking'}</Button>
        )}
    <p className="mt-3" style={{ textAlign: "justify" }}>
    {showMore ? response : response.slice(0, 200)}
    {!showMore && response.length > 200 && (
    <span>
   <Link style={{color:"#2AAA8A",fontWeight:"600"}} onClick={toggleShowMore}> See More</Link>
    </span>
    )}
    {showMore && (
   <span>
   <Link style={{color:"#2AAA8A" ,fontWeight:"600"}} onClick={toggleShowMore}> Show Less</Link>
    </span>
    )}
    </p>
    {clean &&(
      <Button onClick={handleClean} className="mt-3 w-100"  style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><RxOpenInNewWindow/>&nbsp;New Topic</Button>
    )}
    </div>
   </div>
</div>
<Blogbtn/>
<Back/>
</div> 
 </>
    )
}

export default Describe;