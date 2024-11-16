/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/
import autoprefixer from 'autoprefixer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    eslint(),
    tsconfigPaths(),
  ],

  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },

});
