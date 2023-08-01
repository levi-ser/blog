import React, { useState } from "react";
import axios from "axios";
import { Typography, TextField, Button, Box } from "@mui/material";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/posts/new",
        {
          title,
          body,
        },
        {
          withCredentials: true
        }
      );

      // Reset the form
      setTitle("");
      setBody("");
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
