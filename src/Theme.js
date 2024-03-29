import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5722",
    },
    secondary: {
      main: "#4CAF50",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700, // Increased the font weight for boldness
    h1: {
      fontSize: "3rem",
      fontWeight: 700, // Increased the font weight for boldness
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600, // Increased the font weight for boldness
      marginBottom: "0.5rem",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600, // Increased the font weight for boldness
      marginBottom: "0.5rem",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600, // Increased the font weight for boldness
      marginBottom: "0.5rem",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600, // Increased the font weight for boldness
      marginBottom: "0.5rem",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600, // Increased the font weight for boldness
      marginBottom: "0.5rem",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      marginBottom: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      marginBottom: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          padding: "12px 20px",
          boxShadow: "none",
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "#f44336",
          },
        },
        containedPrimary: {
          backgroundColor: "#FF5722",
          color: "#fff",
        },
        containedSecondary: {
          backgroundColor: "#4CAF50",
          color: "#fff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // Increased the box shadow for a more pronounced effect
          borderRadius: "10px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
          "& .MuiInputBase-root": {
            borderRadius: "10px", // Added border radius to the input field
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginBottom: "0.5rem",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: "1rem",
        },
      },
    },
  },
});

export default theme;
