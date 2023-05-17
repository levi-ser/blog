
import PostsComponent from "../components/PostsComponent";
import posts from '../components/Posts';
import React from "react";
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();

  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container">
      <div>
        <h1>{post.title}</h1>
        <h3>{post.excerpt}</h3>
        <p>Published on {post.publishedOn}</p>
      </div>
    </div>
  );
};

export default Post;