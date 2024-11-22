import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createPostSlice from './post-slice';
import createAuthSlice from './auth-slice';

const useStore = create(devtools(immer((...args) => ({

  postSlice: createPostSlice(...args),
  authSlice: createAuthSlice(...args), // add in your new auth slice
  authType: 'token', // specify 'token' auth type
}))));

export default useStore;
