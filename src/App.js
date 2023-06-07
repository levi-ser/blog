import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import AboutMe from "./pages/AboutMe";
import ContactMe from "./pages/ContactMe";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Layout from "./components/Layout";
import NewPost from "./pages/NewPost";
import PostsComponent from "./components/PostsComponent";
import SignUp from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import { useState, Navigate } from "react";
import Logout from "./components/Logout";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const LoginRoute = () => {
    if (loggedIn) {
      return <Navigate to="/" replace />;
    } else {
      return <LoginForm setLoggedIn={setLoggedIn} />;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout", null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLoggedIn(false);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="contact" element={<ContactMe />} />
          <Route path="newpost" element={<NewPost />} />
          <Route path="posts" element={<PostsComponent />} />
          <Route path="posts/:id" element={<Post />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LoginRoute />} />
          <Route
            path="logout"
            element={<Logout handleLogout={handleLogout} />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
