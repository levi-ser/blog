import React from 'react';
import BlogPost from './BlogPost';

function PostsComponent(props) {
  const { posts } = props;

  return (
    <div className="left-side">
      {posts.map(post => (
        <BlogPost
          key={post.id}
          title={post.title}
          excerpt={post.excerpt}
          link={post.link}
          publishedOn={post.publishedOn}
        />
      ))}
    </div>
  );
}

export default PostsComponent;