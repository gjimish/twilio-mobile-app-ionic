import axios from 'axios';
import {
  environment
} from '../environments/environment';
const setBasePath = () => {
  // set base URL from environment
  axios.defaults.baseURL = environment.API_BASE_END_POINT;
};
export default setBasePath;
