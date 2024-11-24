/* eslint-disable max-len */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ActionIcon, Avatar, Button } from '@mantine/core';
import useStore from '../store';
import NewPostIcon from '../img/new_post_bttn';
import BlogHooks from './BlogHooks';

function Nav(props) {
  const authenticated = useStore(({ authSlice }) => authSlice.authenticated);
  const signOut = useStore(({ authSlice }) => authSlice.signoutUser);
  const navigate = useNavigate();
  const user_name = useStore(({ authSlice }) => authSlice.user_name);
  const [profileClick, setprofileClick] = useState(false);
  const profilemenu = useRef(null);

  console.log(user_name);
  const sigingOut = async () => {
    await signOut();
    setprofileClick(false);
    navigate('/');
  };

  const helper = (event) => {
    const isInsideProfileMenu = profilemenu.current && profilemenu.current.contains(event.target);
    const isProfileIconClicked = event.target.classList.contains('m_104cd71f');

    if (isInsideProfileMenu || isProfileIconClicked) {
      console.log('Inside menu or clicked profile icon');
      // Do nothing or keep the menu open
      return;
    }

    console.log('Outside menu');
    // Close the menu
    setprofileClick(false);
  };

  useEffect(() => {
    document.addEventListener('click', helper);
    return () => {
      document.removeEventListener('click', helper);
    };
  }, []);

  return (
    <nav className="navBar">
      <div className="leftnavSection">
        <li><NavLink to="/">Home</NavLink></li>

      </div>

      <div className="navmidsection">
        <BlogHooks />
      </div>
      {/* <div className="navEndContainer"> */}
      <li><NavLink to="/posts/new"> <ActionIcon variant="gradient" gradient={{ from: 'rgba(82, 44, 84, 1)', to: 'rgba(137, 40, 161, 1)', deg: 124 }} radius="md"> <NewPostIcon /> </ActionIcon> </NavLink></li>
      <li> {
        !authenticated ? (
          <NavLink to="/signin"><Button radius="xl" color="#41093E"> Log in</Button></NavLink>

        ) : (

          <Avatar // Prevent event propagation
            className="profile"
            onClick={() => setprofileClick(!profileClick)}
            name={user_name}
            color="initials"
          />

        )
      }{profileClick && (
        <div className="profilemenu" ref={profilemenu}>
          <div className="menuItem">
            <h4>Settings</h4>
          </div>
          <div className="menuItem">
            <Button color="#41093E" radius="xl" onClick={sigingOut}> Sign Out</Button>
          </div>
        </div>
      )}
      </li>
    </nav>
  );
}

export default Nav;
