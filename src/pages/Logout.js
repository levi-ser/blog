import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import axios from "axios";
const Logout = ({ setLoggedIn, loggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout", null, {
        withCredentials: true
      });
      if (response.status === 200) {
        setLoggedIn(false);
        console.log(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };


  return (
    <Box sx={{ backgroundColor: "#F5F5DC", minHeight: "100vh" }}>
      <div>
        <Typography variant="h4">Logout</Typography>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: "#663399",
            "&:hover": {
              backgroundColor: "#D8BFD8",
            },
          }}
        >
          Logout
        </Button>
      </div>
    </Box>
  );
};

export default Logout;
