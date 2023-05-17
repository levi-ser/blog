import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import React from 'react';
import AboutMe from "./pages/AboutMe";
import ContactMe from "./pages/ContactMe";
import Home from "./pages/Home";
import Post from './pages/Post';
import Layout from './components/Layout';
import NewPost from './pages/NewPost';
import SignIn from './pages/Login';


const App = () => {

  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="contact" element={<ContactMe />} />
          <Route path="newpost" element={<NewPost />} />
          <Route path="login" element={<SignIn />} />
          <Route path="post/:id" element={<Post />} />
        </Route>
      </Routes>
    </div>

  );
}


export default App