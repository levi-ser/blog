// usePosts.js
import { useState, useEffect } from "react";
import axios from "axios";

const usePosts = (endpoint) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(endpoint, {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [endpoint]);

  return posts;
};

export default usePosts;
