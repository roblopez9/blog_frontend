/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    eslint(),

  ],

  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },

});
