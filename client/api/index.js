var axios = require('axios');

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

module.exports = function () {
    const signIn = (formData) => API.post('/user/signin', formData);
    const signUp = (formData) => API.post('/user/signup', formData);
}
