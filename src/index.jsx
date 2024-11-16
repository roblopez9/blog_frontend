/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createRoot } from 'react-dom/client';
import './style.scss';
import { ChakraProvider } from '@chakra-ui/react';
import App from './components/app';

const root = createRoot(document.getElementById('main'));
root.render(
//   <ChakraProvider>

  <App />,
//   </ChakraProvider>,
);
