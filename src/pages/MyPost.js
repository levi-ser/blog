import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Container, Typography, TextField } from "@mui/material";

const EditForm = ({ post, onSave, onCancel }) => {
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setNewBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(newTitle, newBody);
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
      .get(`/myposts`, {
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

  const handleSave = (postId, newTitle, newBody) => {
    axios
      .put(
        `/myposts/${postId}/edit`,
        {
          title: newTitle,
          body: newBody,
        },
        {
          withCredentials: true,
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
        .delete(`/myposts/${postId}/delete`, {
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
                  onSave={(newTitle, newBody) =>
                    handleSave(post.id, newTitle, newBody)
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
