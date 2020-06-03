import axios from 'axios';

export const initApp = () => {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ENDPOINT;
};
