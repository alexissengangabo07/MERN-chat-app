import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUser } from '../../feature/users.slice';
import './style.css';

const Signup = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    dispatch(saveUser({ username, email, password }));
  }

  return (
    <div className='container'>
      <div className='left-side'>
        <div className='text-container'>
          <h2 className='header'>Real Time Chat App</h2>
          <p>
            Welcome, you want to communicate with other people around the world, Signup to have an access to our platform
          </p>
        </div>
      </div>
      <div className='right-side'>
        <div className='head-section'>
          <img src="./assets/images/chatapp-logo.png" alt='logo' width={90} />
          <h2>Create an account</h2>
          <p className='text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nam architecto est facere earum vero, autem suscipit illo nesciunt inventore aliquam praesentium impedit molestiae officia quaerat modi maxime soluta at?
          </p>
        </div>
        <form autoComplete='off' onSubmit={e => { e.preventDefault(); handleSubmit() }}>
          <div className='form-group'>
            <label htmlFor="username">Username</label>
            <input type="text" onInput={e => setUsername(e.target.value)} placeholder='Enter your username' className='input-field' id='username' name='username' required />
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" onInput={e => setEmail(e.target.value)} placeholder='Enter your email' className='input-field' id='email' name='email' required />
          </div>
          <div className='form-group'>
            <label htmlFor="password">New Password</label>
            <input type="password" onInput={e => setPassword(e.target.value)} placeholder='Enter new password' className='input-field' id='password' name='password' autoComplete='off' required />
          </div>
          <div className='form-group'>
            <label htmlFor="password_confirm">Confirm Password</label>
            <input type="password" onInput={e => setConfirmPassword(e.target.value)} placeholder='Retype your password' className='input-field' id='password-confirm' name='password-confirm' autoComplete="off" required />
          </div>
          <div className='form-group'>
            <input type="submit" value="Signup" className='btn-signup' id='btn-signup' name='btn-signup' required />
          </div>
        </form>
        <div>
          <p>Do you have an account ? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup