import { Link, useNavigate  } from "react-router-dom";


const Header = ({ loggedIn }) => {

  
  return (
    <div className="header">
      <Link to={"/"} className="left-link">Home</Link>
      <Link to={"/about"} className="left-link">About me</Link>
      <Link to="/contact" className="left-link">Contact me</Link>
      <Link to="/newpost" className="left-link">New Post</Link>
      <Link to="/posts" className="left-link">Posts</Link>
      <Link to="/signup" className="left-link">Signup</Link>
      <div className="title">
        <h1>Welcome to My Blog</h1>
      </div>
      {loggedIn ? (
      <Link to="/logout" className="logout-button" >Logout</Link>
    ) : (
      <Link to="/login" className="login-link">Login</Link>
    )}
    </div>
  );
};

export default Header;
