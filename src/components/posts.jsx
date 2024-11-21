/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import useStore from '../store';
import BlogHooks from './BlogHooks';

function Posts(props) {
  const allPosts = useStore(({ postSlice }) => postSlice.all);
  const fetchAllPosts = useStore(({ postSlice }) => postSlice.fetchAllPosts);
  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (

    <div className="postwrapper">
      <BlogHooks />
      <div className="postheader">
        <h1>Posts</h1>
      </div>
      <div className="postContainer">
        { allPosts.map((post) => {
          return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <NavLink to={`/posts/${post.id}`} key={post.id} className="postCard">

              <div>
                <img src={post.coverUrl} alt="" />
              </div>
              <div>
                {post.Title}
              </div>
              <div>
                {post.Tags}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
