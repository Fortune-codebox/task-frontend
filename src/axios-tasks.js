import axios from 'axios';

const instance = axios.create({
    baseURL:  'https://task-api-1.herokuapp.com/api/'
});

export default instance;
