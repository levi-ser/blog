import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function PostsComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="left-side">
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <p>Created at: {post.created_at}</p> 
          <Link to={`/posts/${post.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}

export default PostsComponent;
