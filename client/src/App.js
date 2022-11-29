import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import './App.css';

const App = () => {
  return (
    <main className="main-container">
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <ToastContainer />
    </main>
  );
}

export default App