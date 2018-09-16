import Axios from 'axios';
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  AUTH_TOKEN
} from './config'

const BASE_URL = 'https://csc-group-1a.herokuapp.com/';
const AxiosInstance = Axios.create({
    baseURL: BASE_URL,
    auth: {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    }
    
  });
  
  // AxiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  export default AxiosInstance;