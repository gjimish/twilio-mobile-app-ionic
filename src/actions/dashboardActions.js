import axios from 'axios';
import setBasePath from '../utils/setBasePath';
import setAuthToken from '../utils/setAuthToken';

//Get Dashboard data
export const getDashboardData = () => {
  setBasePath();
  setAuthToken();

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  return axios.get('/api/dashboard-data', config);
};
