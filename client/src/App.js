import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { fetchUsers } from './feature/users.slice';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(store => store.connectedUserInfos);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
    {console.log(users)}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App