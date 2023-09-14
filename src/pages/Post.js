import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Chip,  // Import Chip component from Material-UI
} from "@mui/material";

const Post = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [tags, setTags] = useState([]); // State to hold post tags

  useEffect(() => {
    setLoading(true);

    // Fetch post details
    axios
      .get(`/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });

    // Fetch comments for the post
    axios
      .get(`/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Fetch tags associated with the post
    axios
      .get(`/posts/${id}/tags`)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);
  const handleRemoveTag = (tagToRemove) => {
    // Create a new array with tags except the one to be removed
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags); // Update the state with the new array of tags
  };
  const handleAddComment = (event) => {
    event.preventDefault();
    const body = commentInput;

    axios
      .post(
        `/posts/${id}/comments/new`,
        { post_id: id, body },
        { withCredentials: true }
      )
      .then((response) => {
        setCommentInput(""); // Clear the comment input field
        refreshComments(); // Refresh the comments
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const refreshComments = () => {
    axios
      .get(`/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Box sx={{ backgroundColor: "#F5F5DC", minHeight: "100vh" }}>
      <Container>
        <div>
          <Typography variant="h1">{post.title}</Typography>
          <Typography variant="body1">{post.body}</Typography>
          <Typography variant="body2">Created at: {post.created_at}</Typography>
          <Typography variant="body2">Written by: {post.username}</Typography>
          <Typography variant="body2">Views: {post.view_count}</Typography>

          {/* Display tags */}
          <div>
            {tags.map((tag) => (
              <Chip key={tag.id} label={tag.tag_name} />
            ))}
          </div>
        </div>

        <div>
          <Typography variant="h2">Comments</Typography>
          <Divider />
          {comments.map((comment) => (
            <div key={comment.id}>
              <Typography variant="body1">{comment.body}</Typography>
              <Typography variant="body2">
                Created at: {comment.created_at}
              </Typography>
              <Typography variant="body2">
                Written by: {comment.username}
              </Typography>
              <Divider />
            </div>
          ))}
        </div>

        <form onSubmit={handleAddComment}>
          <TextField
            name="comment"
            label="Add Comment"
            multiline
            rows={4}
            fullWidth
            required
            variant="outlined"
            value={commentInput}
            onChange={(event) => setCommentInput(event.target.value)}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#663399",
              "&:hover": {
                backgroundColor: "#D8BFD8",
              },
            }}
          >
            Add Comment
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Post;
