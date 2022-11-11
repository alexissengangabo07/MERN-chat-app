import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Login = () => {
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
        <form autoComplete='off'>
          <div className='form-group'>
            <label for="email">Email or Username</label>
            <input type="email" placeholder='Enter your email or username' className='input-field' id='email' name='email' required />
          </div>
          <div className='form-group'>
            <label for="password">Password</label>
            <input type="password" placeholder='Enter your password' className='input-field' id='password' name='password' required />
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