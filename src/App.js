import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import AboutMe from "./pages/AboutMe";
import ContactMe from "./pages/ContactMe";
import Home from "./pages/Home";
import Post from "./pages/Post";
import MyPost from "./pages/MyPost";
import Layout from "./components/Layout";
import NewPost from "./pages/NewPost";
import PostsComponent from "./components/PostsComponent";
import SignUp from "./pages/SignUpForm";
import { useState, useEffect} from "react";
import Logout from "./pages/Logout";
import LoginRoute from "./components/LoginRoute";
import checkLoginStatus from "./components/checkLoginStatus";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus(setLoggedIn);
  }, []);


  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="contact" element={<ContactMe />} />
          <Route path="newpost" element={<NewPost />} />
          <Route path="myposts" element={<MyPost />} />
          <Route path="posts" element={<PostsComponent  showSortButton={true} />} />
          <Route path="posts/:id" element={<Post />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LoginRoute setLoggedIn={setLoggedIn} />} />
          <Route
            path="logout"
            element={<Logout  setLoggedIn={setLoggedIn} />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
