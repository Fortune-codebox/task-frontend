import axios from 'axios';

const instance = axios.create({
    baseURL:  'http://task-api-1.herokuapp.com/api/'
});

export default instance;
