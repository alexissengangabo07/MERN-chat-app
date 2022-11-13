import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';
import { userAuthentication } from '../../feature/users.slice';

const Login = () => {
  const dispatch = useDispatch();
  const emailField = useRef(null);
  const passwordField = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailField.current.value;
    const password = passwordField.current.value;

    dispatch(userAuthentication({email, password}));
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
          <h2>Login with your email</h2>
          <p className='text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nam architecto est facere earum vero, autem suscipit illo nesciunt inventore aliquam praesentium impedit molestiae officia quaerat modi maxime soluta at?
          </p>
        </div>
        <form autoComplete='off' onSubmit={e => handleSubmit(e)}>
          <div className='form-group'>
            <label htmlFor="email">Email or Username</label>
            <input type="text" ref={emailField} placeholder='Enter your email or username' className='input-field' id='email' name='email' />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" ref={passwordField} placeholder='Enter your password' className='input-field' id='password' name='password' autoComplete='off' required />
          </div>
          <div className='form-group'>
            <input type="submit" value="Login" className='btn-signup' id='btn-signup' name='btn-signup' required />
          </div>
        </form>
        <div>
          <p>You don't have an account ? <Link to="/signup">Signup</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;