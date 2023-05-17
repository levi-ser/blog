import { Link } from 'react-router-dom';
const PopularPosts = ({ posts }) => {
  return (
    <div className="popular-list">
      <ul className="no-list-style">
        {posts.map(post => (
          <li key={post.id}>
            <span>{post.title}</span>
            <Link to={`/post/${post.id}`}>Read more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PopularPosts