import axios from 'axios';

const API = axios.create({ baseURL: 'https://intense-bastion-25012.herokuapp.com/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const signIn = (formData) => API.post('/api/signin', formData)
                                          .then(async (res) => {
                                              return res;
                                            })
                                            .catch((err) => {
                                              return window.alert('Invalid credentials, check your Email or Password');
                                            });
export const signUp = (formData) => API.post('/api/signup', formData);
