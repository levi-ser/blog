
import PostsComponent from "../components/PostsComponent";
import posts from '../components/Posts';
import React from "react";
const Post = () => {
    return (
        <div className="container">
            <PostsComponent posts={posts} />
        </div>);
};

export default Post;