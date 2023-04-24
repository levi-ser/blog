import './App.css';
import React from 'react';

const App = () => {
  return (
    <div className="body">
      {
      <div className="container">
         <div className="left-side">
            <button>Home</button>
            <button>About me</button>
            <button>Contact me</button>   
            <div className="title">
               <h1>Welcome to My Blog</h1>
            </div>
            <div className="blog-post">
              <h2>Blog post #1</h2>
              <h3>"True wisdom comes from admitting one's own ignorance and seeking knowledge through questioning and dialogue..."           <a href="url">Click here for more</a></h3>
               <p>Published on 400 BCE by Socrates</p>
            </div>
            <div className="blog-post">
              <h2>Blog post #2</h2>
               <h3>"The ultimate goal of human life is to achieve the highest form of knowledge and understanding through reason and contemplation..."
                 <a href="url">Click here for more</a></h3>
               <p>Published on 380 BCE by Plato</p>
            </div>
            <div className="blog-post">
              <h2>Blog post #3</h2>
               <h3>"Virtue is the key to living a good life and achieving true happiness..."
                 <a href="url">Click here for more</a></h3>
               <p>Published on 360 BCE by Aristotle</p>
            </div>
         </div>
         <div className="right-side">
            <button>Login</button>
            <div className="tabs-container">
               <h2>Latest</h2>
               <div className="latest-list">
                  <ul className="no-list-style">
                     <li><span> Blog Post #1</span>
                       <a href="#">Go To Page</a></li>
                     <li><span> Blog Post #2</span>
                       <a href="#">Go To Page</a></li>
                     <li><span>Blog Post #3</span>
                       <a href="#">Go To Page</a></li>
                  </ul>
               </div>
               <h2>Popular</h2>
               <div className="popular-list">
                  <ul className="no-list-style">
                     <li><span>Blog Post #1</span>
                       <a href="#">Go To Page</a></li>
                     <li><span> Blog Post #2</span>
                        <a href="#">Go To Page</a>
                     </li>
                     <li><span> Blog Post #3</span>
                        <a href="#">Go To Page</a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   
}
    </div>
  );
}

export default App;