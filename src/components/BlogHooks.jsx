/* eslint-disable no-unused-vars */
import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import debounce from 'lodash.debounce';
import { NavLink } from 'react-router-dom';
import { TextInput } from '@mantine/core';
import useStore from '../store';
import SearchIcon from '../img/searchIcon';

function BlogHooks() {
  const searchPosts = useStore(({ postSlice }) => postSlice.searchPost);
  const [postList, setpostList] = useState([]);
  const [onsearch, setonSearch] = useState(false);
  const [searchText, setsearchText] = useState('');

  const searchContainerRef = useRef(null);

  const search = async (text) => {
    if (text.trim() === '') {
      setpostList([]);
      return;
    }
    try {
      const response = await searchPosts(text);
      setpostList(response);
    } catch (error) {
      console.log(error.json);
    }
  };

  const debounceSearch = useCallback(debounce(search, 500), []);

  const handleSearchChange = (event) => {
    setsearchText(event.target.value);
    const text = event.target.value;
    debounceSearch(text);
  };

  const handleBlogClick = () => {
    setonSearch(false);
    setsearchText('');
    debounceSearch('');
  };

  const handleFocus = () => setonSearch(true);

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current
      && !searchContainerRef.current.contains(event.target)
    ) {
      setonSearch(false);
    }
  };

  // Attach a global click event listener to detect clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="searchWrapper">
      <div className="searchContainer">
        <div className="searchBarFormat" ref={searchContainerRef}>
          <TextInput className="searchBar"
            leftSection={<SearchIcon />}
            style={{ width: '500px' }}
            onFocus={handleFocus}
            onChange={handleSearchChange}
            radius="xl"
            placeholder="Search Article"
            value={searchText}
          />
          {onsearch && (
            <div className="searchList">
              {postList.length === 0 ? (
                <h4>No article found</h4>
              ) : (
                postList.map((post) => (
                  <NavLink
                    to={`posts/${post.id}`}
                    className="postListFound"
                    key={post.id}
                    onClick={handleBlogClick}
                  >
                    <span>{post.Title}</span>
                  </NavLink>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BlogHooks;
