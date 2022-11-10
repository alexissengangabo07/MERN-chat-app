import axios from'axios';

export const fetchUsers = () => axios.get('http://localhost:5000/users/');

export const createUser = (newUser) => axios.post('http://localhost:5000/register/', newUser);