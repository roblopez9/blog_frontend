/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import { useParams } from 'react-router';
import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
import Counter from './components/counter';
import Controls from './components/controls';
import './store';

function Nav(props) {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li>
      </ul>
    </nav>
  );
}

function About(props) {
  return <div> All there is to know about me </div>;
}
function Welcome(props) {
  return (
    <div>Welcome
      <Counter />
      <Controls />
    </div>
  );
}

function Test(props) {
  const { id } = useParams();
  return <div> ID: { id } </div>;
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
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
