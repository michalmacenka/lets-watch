import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_LETSWATCH_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = 10000;
