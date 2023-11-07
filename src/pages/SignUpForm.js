import React, { useState } from "react";
import axios from "axios";
import { Typography, TextField, Button, Container, Box } from '@mui/material';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });

      if (response.status === 201) {
        console.log(response.data.message);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
    sx={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#F5F5DC',
        minHeight: '100vh' ,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" type="submit" fullWidth sx={{
  backgroundColor: '#663399',
  '&:hover': {
    backgroundColor: '#D8BFD8',
  },
}}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
    </Box>
  );
};

export default SignUpForm;
