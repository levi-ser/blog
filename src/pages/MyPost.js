import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Container, Typography, TextField } from "@mui/material";

const EditForm = ({ post, onSave, onCancel }) => {
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);
  const [newTags, setNewTags] = useState(post.tags.split(',').map(tag => tag.trim()) || []); // Convert comma-separated string to an array, or initialize as an empty array if no tags
// Initialize with existing tags

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setNewBody(event.target.value);
  };

  const handleTagsChange = (event) => {
    setNewTags(event.target.value.split(',').map(tag => tag.trim())); // Split input by commas and trim whitespace
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("newTags:", newTags);
    onSave(newTitle, newBody, newTags); // Pass the newTags to the onSave function
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={newTitle}
        onChange={handleTitleChange}
        required
      />
      <TextField
        label="Body"
        variant="outlined"
        fullWidth
        value={newBody}
        onChange={handleBodyChange}
        required
        multiline
        rows={4}
      />
      <TextField
        label="Tags"
        variant="outlined"
        fullWidth
        value={newTags.join(', ')} // Convert the array of tags back to a comma-separated string
        onChange={handleTagsChange}
      />
      <Button type="submit" variant="contained" sx={{
                      backgroundColor: "#663399",
                      "&:hover": {
                        backgroundColor: "#D8BFD8",
                      },
                    }}>
        Save
      </Button>
      <Button variant="contained" onClick={onCancel} sx={{
                      backgroundColor: "#663399",
                      "&:hover": {
                        backgroundColor: "#D8BFD8",
                      },
                    }}>
        Cancel
      </Button>
    </form>
  );
};

const MyPost = () => {
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [editedPostId, setEditedPostId] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/myposts`, {
        withCredentials: true,
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [userId]);

  const handleEdit = (postId) => {
    setEditedPostId(postId);
  };

  const handleSave = (postId, newTitle, newBody, newTags) => {
    axios
      .put(
        `http://localhost:5000/myposts/${postId}/edit`,
        {
          title: newTitle,
          body: newBody,
          tags: newTags, // Include the newTags in the request body
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        }
      )
      .then((response) => {
        console.log("Post updated successfully:", response.data);
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              title: newTitle,
              body: newBody,
              tags: newTags, // Update the tags with the newTags
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        setEditedPostId(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error scenario, such as displaying an error message
      });
  };

  const handleCancel = () => {
    setEditedPostId(null);
  };

  const handleRemove = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`http://localhost:5000/myposts/${postId}/delete`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("Post deleted successfully:", response.data);
          const updatedPosts = posts.filter((post) => post.id !== postId);
          setPosts(updatedPosts);
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error scenario, such as displaying an error message
        });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5DC", minHeight: "100vh" }}>
      <Container>
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              {editedPostId === post.id ? (
                <EditForm
                  post={post}
                  onSave={(newTitle, newBody, newTags) =>
                    handleSave(post.id, newTitle, newBody, newTags)
                  }
                  onCancel={handleCancel}
                />
              ) : (
                <>
                  <Typography variant="h4" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {post.body}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Created at: {post.created_at}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Written by: {post.username}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
      Tags: {post.tags}
    </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(post.id)}
                    sx={{
                      backgroundColor: "#663399",
                      "&:hover": {
                        backgroundColor: "#D8BFD8",
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleRemove(post.id)}
                    sx={{
                      backgroundColor: "#663399",
                      "&:hover": {
                        backgroundColor: "#D8BFD8",
                      },
                    }}
                  >
                    Remove
                  </Button>
                </>
              )}
            </div>
          ))
        )}
      </Container>
    </Box>
  );
};

export default MyPost;
