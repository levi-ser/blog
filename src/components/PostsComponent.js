import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material"; // Import Button

const PostComponent = ({ showSortButton }) => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("views"); // Initialize sortOrder state
  const [buttonLabel, setButtonLabel] = useState("Sort by Popularity"); // Initialize button label state

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts?sort=${sortOrder}`); // Pass the sortOrder as a query parameter
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortOrder]); // Refetch posts when sortOrder changes

  // Function to handle sorting when the button is clicked
  const handleSortByViews = () => {
    if (sortOrder === "views") {
      setSortOrder("-views"); // Sort in descending order
      setButtonLabel("Sort by Latest");
    } else {
      setSortOrder("views"); // Sort in ascending order
      setButtonLabel("Sort by Popularity");
    }
  };

  return (
    <Box sx={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <div className="left-side">
      <Button variant="contained" onClick={handleSortByViews} style={{ display: showSortButton ? 'block' : 'none' }}>
  {buttonLabel}
</Button>

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
