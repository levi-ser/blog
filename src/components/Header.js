import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const StyledHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#663399",
  padding: "10px",
});

const StyledTitle = styled("div")({
  textAlign: "center",
});

const StyledButton = styled(Button)({
  margin: "5px",
  color: "#000000"
});

const Header = ({ loggedIn }) => {
  return (
    <StyledHeader>
      <div>
        <Link to={"/"} className="left-link">
          <StyledButton variant="contained" style={{ backgroundColor: "#E6E6FA" }}>
            Home
          </StyledButton>
        </Link>
        <Link to={"/about"} className="left-link">
          <StyledButton variant="contained" style={{ backgroundColor: "#E6E6FA" }}>
            About me
          </StyledButton>
        </Link>
        <Link to="/contact" className="left-link">
          <StyledButton variant="contained" style={{ backgroundColor: "#E6E6FA" }}>
            Contact me
          </StyledButton>
        </Link>
        <Link to="/newpost" className="left-link">
          <StyledButton variant="contained" style={{ backgroundColor: "#E6E6FA" }}>
            New Post
          </StyledButton>
        </Link>
        <Link to="/posts" className="left-link">
          <StyledButton variant="contained" style={{ backgroundColor: "#E6E6FA" }}>
            Posts
          </StyledButton>
        </Link>
        <Link to="/myposts" className="left-link">
          <StyledButton variant="contained" style={{ backgroundColor: "#E6E6FA" }}>
            My Posts
          </StyledButton>
        </Link>
      </div>
      <StyledTitle>
        <h1>Welcome to My Blog</h1>
      </StyledTitle>
      {loggedIn ? (
        <Link to="/logout" >
          <StyledButton variant="contained" style={{ backgroundColor: "#E6E6FA" }}>
            Logout
          </StyledButton>
        </Link>
      ) : (
        <Link to="/login" >
          <StyledButton variant="contained" style={{ backgroundColor: "#E6E6FA" }}>
            Login
          </StyledButton>
        </Link>
      )}
    </StyledHeader>
  );
};

export default Header;
