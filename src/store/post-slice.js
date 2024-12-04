/* eslint-disable consistent-return */
import axios from 'axios';

const ROOT_URL = 'http://localhost:9090';

export default function createPostSlice(set, get) {
  // const ROOT_URL = 'https://backend-blog-dope.onrender.com';

  return {
    all: [],
    current: {},
    list: [],
    fetchPost: async (id) => {
      // GET
      // takes the ID of the post to fetch from router params
      // const ROOT_URL = 'http://localhost:9090';
      // const API_KEY = '?key=yourfirstname_yourlastname';
      try {
        const response = await axios.get(`${ROOT_URL}/api/posts/${id}`);
        // console.log(response);
        set(({ postSlice }) => { postSlice.current = response.data; }, false, 'posts/fetchPost');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    fetchCurrentPosts: async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/api/posts?p=0`);
        set(({ postSlice }) => { postSlice.all = response.data; }, false, 'posts/fetchCurrentPosts');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    fetchNewPosts: async (pagenum) => {
      // GET
      // would need pagination but for now we'll just get them all
      // const ROOT_URL = 'http://localhost:9090';
      try {
        console.log('insidefetch');
        const response = await axios.get(`${ROOT_URL}/api/posts?p=${pagenum}`);
        console.log(response.data.length);
        if (response.data.length > 0) {
          // set(({ postSlice }) => { postSlice.all = response.data; }, false, 'posts/fetchAllPosts');
          set(
            (state) => {
              // Append new data to the existing 'all' array
              state.postSlice.all = [...state.postSlice.all, ...response.data];
            },
            false,
            'posts/fetchNewPosts',
          );
        } else {
          return false;
        }
        // set(
        //   (state) => ({
        //     postSlice: {
        //       ...state.postSlice, // Keep the existing postSlice state
        //       all: [...state.postSlice.all, ...response.data], // Append new posts to existing ones
        //     },
        //   }),
        //   false, // Disable logging to DevTools by default
        //   'post/fetchAllPosts', // Action name for DevTools debugging
        // );
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    updatePost: async (id, post) => {
      // PUT
      // takes in updated data (could include the ID of the post to update in the post object or add a separate parameter
      // const ROOT_URL = 'http://localhost:9090';

      try {
        const response = await axios.put(`${ROOT_URL}/api/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } });
        // set(({ postSlice }) => { postSlice.current = response.data; }, false, 'posts/updatePost');
        console.log(response);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    createPost: async (post) => {
      // POST
      // takes in new post data (no id)
      // const ROOT_URL = 'http://localhost:9090';
      try {
        const response = await axios.post(`${ROOT_URL}/api/posts`, post, { headers: { authorization: localStorage.getItem('token') } });
        console.log(response);
        // set(({ postSlice }) => {postSlice.all = response.data; }, false);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    deletePost: async (id) => {
      // DELETE
      // takes id of the post to delete
      // const ROOT_URL = 'http://localhost:9090';
      try {
        const response = await axios.delete(`${ROOT_URL}/api/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } });
        console.log(response);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    searchPost: async (searchTerm) => {
      // const ROOT_URL = 'http://localhost:9090';
      try {
        const response = await axios.get(`${ROOT_URL}/api/posts/search`, {
          params: { Title: searchTerm }, // Pass the search term as a query parameter
        });
        return response.data;
        // console.log(response.data);
        // set(({ postSlice }) => { postSlice.list = response.data; }, false, 'posts/searchPost');
        // console.log(response);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
  };
}
