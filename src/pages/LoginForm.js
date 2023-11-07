import React, { useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Typography, TextField, Button, Container, Box } from "@mui/material";

const LoginForm = ({ setLoggedIn, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loggedIn) {
      console.log("Already logged in");
      navigate("/");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data.message);

        setUsername("");
        setPassword("");
        navigate("/");
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5DC", minHeight: "100vh" }}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#F5F5DC",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Login
            </Button>
          </form>
          <Typography variant="body2" component="p">
            Don't have an account?{" "}
            <Link to="/signup" onClick={handleSignup}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginForm;
