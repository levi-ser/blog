import React, { useState } from "react";
import axios from "axios";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/posts", {
        title,
        body,
      });

      // Reset the form
      setTitle("");
      setBody("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
