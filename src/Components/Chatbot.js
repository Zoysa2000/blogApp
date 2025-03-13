import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  Avatar,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import axios from "axios";
import Back from "./Back";
import { GrSend } from "react-icons/gr";
function Chatbot()
{
    const avatarIco = 'https://1millionbot.com/wp-content/uploads/2018/09/bill-chatbot.png';
    const avatar="https://png.pngtree.com/png-clipart/20230401/original/pngtree-smart-chatbot-cartoon-clipart-png-image_9015126.png"
    const[typing,setTyping]=useState(false)
    const [messages, setMessages] = useState([]);//arry stores all user message and response messages
    const [userInput, setUserInput] = useState('Hi Chat Bot!, I need your help?');

   const handleSendMessage = (text) => {
    setUserInput('')
        const value = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(value);
    // Add the new message to the messages array
    setMessages((prevMessages) => [...prevMessages, { text, role: 'user' }]); //store as a array in objects
    setTyping(true)
    handleGenerate(text)
    };

    const handleGenerate=(prompt)=>
    {
      axios
      .post("http://localhost:5555/chat", { prompt })
      .then((res) => {
      // Add the new message to the messages array
      setMessages((prevMessages) => [...prevMessages, { text: res.data, role: 'bot' }]);
       setTyping(false)
       const value = new SpeechSynthesisUtterance(res.data);
       window.speechSynthesis.speak(value);
      })
      .catch((err) => {
        console.error(err);
      });
     }
return(
<>
<div className="container">
   <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
   <div className="card text-center col-12 col-md-5 mx-auto "  style={{ boxShadow: '0 0 15px #2AAA8A'}}>
   <div className="card-body">
   <img className="web-logo-register" src='./icon.png' alt="icon-img"/>
    <h3 className="card-title">IntelleWave Chat Bot</h3>
   <div className style={{ position: "relative", height: "400px" }}>
   <MainContainer>
    <ChatContainer>
    <MessageList className="mt-3"
    typingIndicator={typing ? <TypingIndicator content="Chat Bot is typing"/>:null}
    >
    {messages.map((message, index) => (
    <Message
      key={index}
      model={{
        message: message.text,
        direction: message.role === 'user' ?'outgoing' :"incoming",
        position: "single"
        }}avatarPosition={message.role === 'user' ? 'tr' : 'tl'}
        style={{textAlign:"justify"}}><Avatar  src={message.role==="user"? `${avatarIco}`:  `${avatar}`}/></Message>
    ))}
   </MessageList>
    </ChatContainer>
  </MainContainer>
  </div>
  <Back/>
  <div className="d-flex gap-2">
  <input
    type="name"
    placeholder="Ask any questions?"
    className="input-field mt-3 w-100"
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
   />
   <GrSend className="mt-4" size={30} color="#2AAA8A" onClick={() => handleSendMessage(userInput)}/>
  </div>
    </div>
   </div>
</div> 
</div>
        </>
    )
}
export default Chatbot;