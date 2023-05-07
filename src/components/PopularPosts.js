const PopularPosts = ({ posts }) => {
  return (
    <div className="popular-list">
      <ul className="no-list-style">
        {posts.map(post => (
          <li key={post.id}>
            <span>{post.title}</span>
            <a href={post.link}>Go To Page</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PopularPosts