import { BrowserRouter as Router,  Route,Routes } from "react-router-dom";

import './App.css';
import React from 'react';
import Header from './components/Header';
import BlogPost from './components/BlogPost';
import PopularPosts from './components/PopularPosts';
import LatestPosts from './components/LatestPosts';


const App = () => {
   const posts = [
     {
       id: 1,
       title: 'Blog post #1',
       excerpt: '...',
       link: 'url',
       publishedOn: '2023',
     },
     {
       id: 2,
       title: 'Blog post #2',
       excerpt: '...',
       link: 'url',
       publishedOn: '2023',
     },
     {
       id: 3,
       title: 'Blog post #3',
       excerpt: '...',
       link: 'url',
       publishedOn: '2023',
     },
   ];
 
   return (
    <Router >
     <div className="body">
     <Routes>
          <Route exact path="/">
            {/* */}
          </Route>
          <Route exact path="/about">
            {/* */}
          </Route>
          <Route exact path="/contact">
            {/* */}
          </Route>
          <Route exact path="/login">
            {/* */}
          </Route>
        </Routes>
       <Header />
       
 
       <div className="container">
         <div className="left-side">
           {posts.map(post => (
             <BlogPost
               key={post.id}
               title={post.title}
               excerpt={post.excerpt}
               link={post.link}
               publishedOn={post.publishedOn}
             />
           ))}
         </div>
 
         <div className="right-side">
           <button>Login</button>
 
           <div className="tabs-container">
             <h2>Latest</h2>
             <LatestPosts posts={posts} />
 
             <h2>Popular</h2>
             <PopularPosts posts={posts} />
           </div>
         </div>
       </div>
     </div>
     </Router>
   );
 }
 

 export default App