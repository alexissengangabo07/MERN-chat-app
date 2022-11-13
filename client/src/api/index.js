import axios from'axios';

export const fetchUsers = () => axios.get('http://localhost:5000/users/all');

export const createUser = (newUser) => axios.post('http://localhost:5000/users/register/', newUser);

export const userLogin = (userInfos) => axios.post('http://localhost:5000/users/login/', userInfos);