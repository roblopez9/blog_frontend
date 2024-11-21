/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
import '../style.scss';
import { useParams } from 'react-router';
import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import NewPosts from './newPosts';
import Posts from './posts';
import Postid from './currentPosts';
import NewPostIcon from '../img/new_post_bttn';
import BlogHooks from './BlogHooks';

function Nav(props) {
  return (
    <nav className="navBar">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/posts/new"> <NewPostIcon /></NavLink></li>
      </ul>
    </nav>
  );
}

function Welcome(props) {
  return (
    <Posts />
  );
}

function Fallback(props) {
  return <div> URL not found</div>;
}

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          {/* <Route path="/youtube" element={<YouTube />} /> */}
          <Route path="/" element={<Welcome />} />
          <Route path="/posts/new" element={<NewPosts />} />
          <Route path="/posts/:id" element={<Postid />} />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
