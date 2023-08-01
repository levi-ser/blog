import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts/latest");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="latest-list">
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

export default LatestPosts;
