import { Link } from 'react-router-dom';
import React from 'react';
import BlogPost from './BlogPost';
function PostsComponent(props) {
  const { posts } = props;

  return (
    <div className="left-side">
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <Link to={`/post/${post.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
export default PostsComponent;