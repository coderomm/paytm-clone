import axios from 'axios';

const getBaseURL = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3000/api/v1';
  } else {
    return 'http://192.168.43.126:3000/api/v1';
  }
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export default axiosInstance;
