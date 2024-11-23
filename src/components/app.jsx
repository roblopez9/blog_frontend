/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
// import { createRoot } from 'react-dom/client';
import '../style.scss';
import { useParams, useNavigate } from 'react-router';
import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
import { Avatar, Button } from '@mantine/core';
import NewPosts from './newPosts';
import Posts from './posts';
import Postid from './currentPosts';
import NewPostIcon from '../img/new_post_bttn';
import BlogHooks from './BlogHooks';
import useStore from '../store';
import SignIn from './signIn';
import SignUp from './signUp';
import RequireAuth from './auth';
import Nav from './nav';

function Welcome(props) {
  return (
    <Posts />
  );
}

function Fallback(props) {
  return <div> URL not found</div>;
}

function App(props) {
  const loadUser = useStore(({ authSlice }) => authSlice.loadUser);
  // const fields = { email: 'rob123@gmail.com', password: 'pw123pw' };
  // console.log(signIn(fields, '/'));

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          {/* <Route path="/youtube" element={<YouTube />} /> */}
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/posts/new" element={<RequireAuth> <NewPosts /> </RequireAuth>} />
          <Route path="/posts/:id" element={<Postid />} />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
