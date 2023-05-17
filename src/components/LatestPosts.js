import { Link } from 'react-router-dom';


const LatestPosts = ({ posts }) => {
  return (
    <div className="latest-list">
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
export default LatestPosts