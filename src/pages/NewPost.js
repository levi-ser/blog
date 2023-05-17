import React, { useState } from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Title: ${title}\nContent: ${content}`);
  };

  return (
    <NewPostContainer>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="title">Title:</InputLabel>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="form-input"
            style={{ fontWeight: "bold" }} // Add this line
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="content">Content:</InputLabel>
          <Textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            rows={10}
            className="form-textarea"
          />
        </FormControl>
        <ButtonContainer>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </ButtonContainer>
      </form>
    </NewPostContainer>
  );
};

const NewPostContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const FormControl = styled("div")({
  marginBottom: "1rem",
});

const InputLabel = styled("label")({
  marginBottom: "0.5rem",
  fontWeight: "bold",
});

const Input = styled(TextField)({
  width: "100%",
});

const Textarea = styled(TextareaAutosize)({
  width: "100%",
  resize: "vertical",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
});

export default NewPostForm;
