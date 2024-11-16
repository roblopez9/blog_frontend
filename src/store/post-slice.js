import axios from 'axios';

export default function createPostSlice(set, get) {
  return {
    all: [],
    current: {},
    fetchPost: async (id) => {
      // GET
      // takes the ID of the post to fetch from router params
      const ROOT_URL = 'https://platform.cs52.me/api';
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
      const ROOT_URL = 'https://platform.cs52.me/api';
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
      const ROOT_URL = 'https://platform.cs52.me/api';

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
      const ROOT_URL = 'https://platform.cs52.me/api';
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
      const ROOT_URL = 'https://platform.cs52.me/api';
      try {
        const response = await axios.delete(`${ROOT_URL}/posts/${id}`);
        console.log(response);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
  };
}
