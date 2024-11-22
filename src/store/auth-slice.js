import axios from 'axios';

export default function createAuthSlice(set, get) {
  return {
    authenticated: false,
    currentemail: '',

    loadUser: async () => {
      const token = localStorage.getItem('token');
      const ROOT_URL = 'http://localhost:9090';

      if (token) {
        // Update authenticated state if token exists
        set(({ authSlice }) => { authSlice.authenticated = true; }, false, 'auth/loadUser');
        const response = await axios.get(`${ROOT_URL}/user`, { headers: { authorization: localStorage.getItem('token') } });

        set(({ authSlice }) => { authSlice.currentemail = response.data.email; });
      }
    },
    signinUser: async (fields) => {
      const ROOT_URL = 'http://localhost:9090';
      try {
        const response = await axios.post(`${ROOT_URL}/signin`, fields);
        // if (response) {
        set(({ authSlice }) => { authSlice.authenticated = true; }, false, '/signin');
        // console.log(response);
        set(({ authSlice }) => { authSlice.currentemail = response.data.email; });
        localStorage.setItem('token', response.data.response);
        // localStorage.setItem('email', response.data.email);
        // }
      } catch (error) {
        get().errorSlice.newError('Sign in Failed');
      }
    },
    signUpUser: async (fields) => {
      const ROOT_URL = 'http://localhost:9090';
      try {
        const response = await axios.post(`${ROOT_URL}/signup`, fields);
        set(({ authSlice }) => { authSlice.authenticated = true; }, false, '/signup');
        localStorage.setItem('token', response.data.response);
        set(({ authSlice }) => { authSlice.currentemail = response.data.email; });
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    signoutUser: async () => {
      localStorage.removeItem('token');
      set(({ authSlice }) => { authSlice.authenticated = false; }, false, '/signout');
      set(({ authSlice }) => { authSlice.currentemail = ''; });
    },

  };
}
