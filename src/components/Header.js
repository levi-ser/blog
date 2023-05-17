import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">

      <Link to={"/"} className="left-link">Home</Link>
      <Link to={"/about"} className="left-link">About me</Link>
      <Link to="/contact" className="left-link">Contact me</Link>
      <Link to="/newpost" className="left-link">New Post</Link>
      <div className="title">
        <h1>Welcome to My Blog</h1>
      </div>
      <Link to="/login" className="login-link">Login</Link>

    </div>
  );
}
export default Header