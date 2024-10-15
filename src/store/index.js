/* eslint-disable import/no-extraneous-dependencies */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(devtools((set) => {
  return {
    count: 0,
    // careful with this syntax - if 2nd arg is true it will replace all state rather than merge
    increment: () => set((state) => ({ count: state.count + 1 }), false, 'count/increment'),
    decrement: () => set((state) => ({ count: state.count - 1 }), false, 'count/decrement'), 
  };
}));

export default useStore;
