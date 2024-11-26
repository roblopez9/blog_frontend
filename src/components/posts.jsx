/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import useStore from '../store';
import BlogHooks from './BlogHooks';

function Posts(props) {
  const allPosts = useStore(({ postSlice }) => postSlice.all);
  const fetchAllPosts = useStore(({ postSlice }) => postSlice.fetchAllPosts);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchAllPosts(page);
  }, [page]);

  const handleScroll = (event) => {
    console.log('Height', document.documentElement.scrollHeight);
    console.log('top', document.documentElement.scrollTop);
    console.log('clientHeight', document.documentElement.clientHeight);
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      // console.log('the page number is' + setPage((prevPage) => prevPage + 1));
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('click', handleScroll);
  }, []);
  return (

    <div className="postwrapper">
      <div className="postheader">
        <h1>
          Posts
        </h1>
      </div>
      <div className="postContainer">
        { allPosts.map((post) => {
          return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <NavLink to={`/posts/${post.id}`} key={post.id} className="postCard">

              { post.coverUrl ? (
                <div>
                  <img src={post.coverUrl} alt="" />
                </div>
              ) : (
                <div />
              )}
              <div>
                <h1>
                  {post.Title}
                </h1>
              </div>
              <div>
                <span>
                  {post.Tags}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
