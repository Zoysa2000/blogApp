import React from "react";
import { Button } from "react-bootstrap";
import { LuRefreshCw } from "react-icons/lu";
import { useState } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";
import axios from "axios";
import Back from "./Back";
import { Link } from "react-router-dom";
function Quizbot()
{
    const[show,setShow]=useState(false);
    const[prompt,setPromt]=useState('');
    const[response,setResponse]=useState('');
    const[clean,setClean]=useState(false);
    const [showMore, setShowMore] = useState(false)
    const handleGenerate=()=>
    {
    setShow(!show)
    axios
      .post("http://localhost:5555/quiz", { prompt })
      .then((res) => {
        setResponse(res.data);
        setShow(false);
        setClean(true)
      })
      .catch((err) => {
        console.error(err);
      });
     
    }

    const handleClean=()=>
    {
      setPromt('');
      setResponse('');
      setClean(false);
      setShowMore(false)
    }
    const toggleShowMore = () => {
      setShowMore(!showMore);
    };
    return(
        <>
    <div className="container">
   <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}} >
   <div className="card text-center col-12 col-md-5 mx-auto"  style={{ boxShadow: '0 0 15px #2AAA8A'}}>
   <div className="card-body">
   <img className="web-logo-register" src='./icon.png' alt="icon-img"/>
    <h3 className="card-title">IntelleWave Quiz Bot</h3>
    <input
    type="name"
    placeholder="Ask any questions?"
    className="input-field mt-3 w-100"
    value={prompt}
    onChange={(e)=>setPromt(e.target.value)}
    />
    <Button onClick={handleGenerate} className="mt-3 w-100"  style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><LuRefreshCw/>&nbsp;Generate</Button>
    {show &&(
          <div className="spinner-border mt-4" role="status" style={{color:"#2AAA8A"}}>
          <span className="visually-hidden">Loading...</span>
        </div>  
        )}
     <p className="mt-3" style={{ textAlign: "justify" }}>
    {showMore ? response : response.slice(0, 100)}
    {!showMore && response.length > 100 && (
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
      <Button onClick={handleClean} className="mt-3 w-100"  style={{backgroundColor:"#2AAA8A",borderColor:"#2AAA8A"}}><RxOpenInNewWindow/>&nbsp;New Quiz</Button>
        )}
    </div>
   </div>
</div>
<Back/>
</div> 
        </>
    )
}

export default Quizbot;