import axios from 'axios';

const url = 'http://localhost:5000/users/';

export const fetchUsers = (token) => axios.get(url + 'all/', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const createUser = (newUser) => axios.post(url + 'register/', newUser);

export const logInUser = (userInfos) => axios.post(url + 'login/', userInfos);