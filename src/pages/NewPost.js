import React, { useState } from "react";
import  '../App.css'

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Title: ${title}\nContent: ${content}`);
  };

  return (
    <div className="newpost">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="form-input"
          
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            rows={10}
            className="form-textarea"
           
          />
        </div>
        <div>
          <button type="submit" className="form-submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
