import axios from'axios';

const url = 'http://localhost:5000/users/';

export const fetchUsers = () => axios.get(url);

export const createUser = (newUser) => axios.post(url, newUser);