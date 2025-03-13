import React from 'react';
import './Style/style.css';
import Splash from './Components/Splash';
import Home from './Components/Home';
import Quizbot from './Components/Quizbot';
import Image from './Components/Image';
import Describe from './Components/Describe';
import Chatbot from './Components/Chatbot';
import './index.css';
import Register from './Components/Register';
import Login from './Components/Login'
import Document from './Components/Document';
import Blogcreate from './Components/Blogcreate';
import {BrowserRouter as
  Router,
  Routes,
  Route} from 'react-router-dom';
  import { Logincontext } from './Context/Logincontext';
  import { BlogIdcontext } from './Context/BlogIdcontext';
  import { useState } from 'react';
  import Userbtn from './Components/Userbtn';
  import Comment from './Components/Comment';
  import Showblog from './Components/Showblog';
  import Blogs from './Components/Blogs';
  import Bloginfo from './Components/Bloginfo';
function App() {
  const[userInfo,setInfo]=useState("");
  const[BlogId,setBlogId]=useState("");
return (
  <div className="App">
  <Router>
  <Logincontext.Provider value={{userInfo,setInfo}}>
    <BlogIdcontext.Provider value={{BlogId,setBlogId}}>
    <Routes>
   <Route exact path="/" element={<Splash/>}></Route>
   <Route exact path="/Home" element={<Home/>}></Route>
   <Route exact path="/Quiz" element={<Quizbot/>}></Route>
   <Route exact path="/Image" element={<Image/>}></Route>
   <Route exact path="/Describe" element={<Describe/>}></Route>
   <Route exact path="/Chat" element={<Chatbot/>}></Route>
   <Route exact path="/Register" element={<Register/>}></Route>
   <Route exact path="/Login" element={<Login/>}></Route>
   <Route element={<Userbtn/>}></Route>
   <Route element={<Comment/>}></Route>
   <Route exact path="/Documentation" element={<Document/>}></Route>
   <Route exact path="/Blog" element={<Blogcreate/>}></Route>
   <Route exact path="/Showblog" element={<Showblog/>}></Route>
   <Route exact path="/Blogs" element={<Blogs/>}></Route>
   <Route exact path="/Bloginfo" element={<Bloginfo/>}></Route>
   </Routes>
    </BlogIdcontext.Provider>
   </Logincontext.Provider>
 </Router>
  </div> 
);
}


export default App;

