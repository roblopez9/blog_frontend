/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import useStore from '../store';
import BlogHooks from './BlogHooks';

function Posts(props) {
  const allPosts = useStore(({ postSlice }) => postSlice.all);
  const fetchNewPosts = useStore(({ postSlice }) => postSlice.fetchNewPosts);
  const [page, setPage] = useState(0);
  const [moredata, setMoreData] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadingData = async () => {
    const currentPagePosts = allPosts.slice(page * 5, (page + 1) * 5); // Assuming 10 posts per page
    if (currentPagePosts.length === 0) {
      setLoading(true);
      const response = await fetchNewPosts(page);
      setLoading(false);
      if (response === false) {
        setMoreData(false);
      }
    }
  };

  useEffect(() => {
    if (moredata && !loading) {
      loadingData();
    }
  }, [page, loading, moredata]);

  const handleScroll = (event) => {
    console.log('Height', window.innerHeight);
    console.log('top', document.documentElement.scrollTop);
    console.log('scrollHeight', document.documentElement.scrollHeight);
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (window.innerHeight
      + document.documentElement.scrollTop + 1
    >= document.documentElement.scrollHeight) {
      // console.log('the page number is' + setPage((prevPage) => prevPage + 1));
      // setLoading(true);
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
        {loading && (
          <Loader />
        )}
        {!moredata && (
          <div>
            <span>
              No more data
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
