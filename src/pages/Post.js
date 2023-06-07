import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container">
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>Created at: {post.created_at}</p>
      </div>
    </div>
  );
};

export default Post;
