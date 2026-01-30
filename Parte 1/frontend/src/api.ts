import axios from 'axios';

const api = axios.create({
  baseURL: 'https://22tvysgrig.execute-api.us-east-1.amazonaws.com/dev/api',
});

export default api;