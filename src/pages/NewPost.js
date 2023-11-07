import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  Chip,
} from "@mui/material";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newTags, setNewTags] = useState([]); // To capture multiple new tags

  const handleNewTagChange = (event) => {
    setNewTag(event.target.value);
  };

  const handleAddNewTag = () => {
    // Add the new tag to the 'newTags' state when the user clicks the "Add Tag" button
    if (newTag.trim() !== "") {
      setNewTags([...newTags, newTag]);
      setNewTag(""); // Clear the input field
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    // Remove the tag from 'newTags' when the user clicks the remove button
    const updatedTags = newTags.filter((tag) => tag !== tagToRemove);
    setNewTags(updatedTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/posts/new",
        {
          title,
          body,
          newTags, // Send the list of new tags to the server
        },
        {
          withCredentials: true,
        }
      );

      // Reset the form
      setTitle("");
      setBody("");
      setNewTags([]);
      setNewTag("");

      // Handle the response as needed (e.g., show a success message or redirect)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "2rem",
        backgroundColor: "#F5F5DC",
        borderRadius: "8px",
        minHeight: "100vh",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Body"
          variant="outlined"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        {/* Input field for adding new tags */}
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <TextField
            label="New Tag"
            variant="outlined"
            value={newTag}
            onChange={handleNewTagChange}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddNewTag} // Add new tag to the 'newTags' state
            sx={{backgroundColor: "#663399",
            "&:hover": {
              backgroundColor: "#D8BFD8",
            },}}
          >
            Add Tag
          </Button>
        </FormControl>
        {/* Display added new tags with remove buttons */}
        <Typography variant="subtitle1">New Tags:</Typography>
        <div>
          {newTags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleRemoveTag(tag)} // Remove tag when clicked
              sx={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
            />
          ))}
        </div>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#663399",
            "&:hover": {
              backgroundColor: "#D8BFD8",
            },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default NewPost;
