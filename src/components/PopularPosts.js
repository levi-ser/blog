import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PopularPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts/popular");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="popular-list">
      <ul className="no-list-style">
        {posts.map((post) => (
          <li key={post.id}>
            <span>{post.title}</span>
            <Link to={`/posts/${post.id}`}>Read more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPosts;
