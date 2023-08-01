import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const PostComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
    <div className="left-side">
      {posts.map((post) => (
        <div key={post.id}>
          <Typography variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {post.body}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Created at: {post.created_at} Written by: {post.username}
          </Typography>
          <Link to={`/posts/${post.id}`}>Read More and Comment...</Link>
        </div>
      ))}
    </div>
    </Box>
  );
};

export default PostComponent;
