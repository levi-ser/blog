const BlogPost = ({ title, excerpt, link, publishedOn }) => {
  return (
    <div className="blog-post">
      <h2>{title}</h2>
      <h3>"{body}" <a href={link}>Click here</a></h3>
      <p>Published on {publishedOn}</p>
    </div>
  );
}
export default BlogPost