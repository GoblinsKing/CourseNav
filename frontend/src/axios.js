import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:3030',
    timeout: 0,
    headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use( (config) => {
    
    return config;
}, (err) => {
    return Promise.reject(err);
});

instance.interceptors.response.use( (res) => {

    return res;
}, (err) => {
    return Promise.reject(err);
});

export default instance;