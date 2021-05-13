import axios from 'axios';
const setAuthToken = () => {
  let token = localStorage.getItem('token');
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthToken;
