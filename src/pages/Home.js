import PopularPosts from "../components/PopularPosts";
import LatestPosts from "../components/LatestPosts";
import PostsComponent from "../components/PostsComponent";
import posts from '../components/Posts';
const Home = () => {
  return (<div className="container">
    <PostsComponent posts={posts} />

    <div className="right-side">
      <button>Login</button>

      <div className="tabs-container">
        <h2>Latest</h2>
        <LatestPosts posts={posts} />

        <h2>Popular</h2>
        <PopularPosts posts={posts} />
      </div>
    </div>
  </div>);
};

export default Home;