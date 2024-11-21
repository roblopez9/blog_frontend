/* eslint-disable consistent-return */
import axios from 'axios';

export default function createPostSlice(set, get) {
  return {
    all: [],
    current: {},
    list: [],
    fetchPost: async (id) => {
      // GET
      // takes the ID of the post to fetch from router params
      const ROOT_URL = 'http://localhost:9090/api';
      // const API_KEY = '?key=yourfirstname_yourlastname';
      try {
        const response = await axios.get(`${ROOT_URL}/posts/${id}`);
        console.log(response);
        set(({ postSlice }) => { postSlice.current = response.data; }, false, 'posts/fetchPost');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    fetchAllPosts: async () => {
      // GET
      // would need pagination but for now we'll just get them all
      const ROOT_URL = 'http://localhost:9090/api';
      try {
        const response = await axios.get(`${ROOT_URL}/posts`);
        set(({ postSlice }) => { postSlice.all = response.data; }, false, 'post/fetchAllPosts');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    updatePost: async (id, post) => {
      // PUT
      // takes in updated data (could include the ID of the post to update in the post object or add a separate parameter
      const ROOT_URL = 'http://localhost:9090/api';

      try {
        const response = await axios.put(`${ROOT_URL}/posts/${id}`, post);
        // set(({ postSlice }) => { postSlice.current = response.data; }, false, 'posts/updatePost');
        console.log(response);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    createPost: async (post) => {
      // POST
      // takes in new post data (no id)
      const ROOT_URL = 'http://localhost:9090/api';
      try {
        const response = await axios.post(`${ROOT_URL}/posts/`, post);
        console.log(response);
        // set(({ postSlice }) => {postSlice.all = response.data; }, false);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    deletePost: async (id) => {
      // DELETE
      // takes id of the post to delete
      const ROOT_URL = 'http://localhost:9090/api';
      try {
        const response = await axios.delete(`${ROOT_URL}/posts/${id}`);
        console.log(response);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    searchPost: async (searchTerm) => {
      const ROOT_URL = 'http://localhost:9090/api';
      try {
        const response = await axios.get(`${ROOT_URL}/posts/search`, {
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