import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createPostSlice from './post-slice';

const useStore = create(devtools(immer((...args) => ({

  postSlice: createPostSlice(...args),
}))));

export default useStore;
