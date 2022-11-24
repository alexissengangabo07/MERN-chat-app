import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { reset, saveUser } from '../../feature/auth.slice';
import { ToastNotifyError } from './toastMessages';
import Loader from '../loader/Loader';
import './style.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameField = useRef(null);
  const emailField = useRef('');
  const passwordField = useRef('');
  const confirmPasswordField = useRef('');
  const { isError, user, isSuccess, isLoading, message } = useSelector(store => store.auth);

  useEffect(() => {
    if (isError) {
      ToastNotifyError(message);
    }
    if (isSuccess || user !== null) {
      navigate('/chat');
    }
    dispatch(reset());
  }, [isError, user, isSuccess, isLoading, message, dispatch, navigate]);

  const handleSubmit = () => {
    // dispatch(saveUser({ username, email, password }));
    let username = usernameField.current.value.trim();
    let email = emailField.current.value.trim();
    let password = passwordField.current.value.trim();
    let passwordConfirm = confirmPasswordField.current.value.trim();

    let usernameTest = username !== '' && username.length > 2 && (/^([a-zA-Zéàèçïô]{3,20})$/).test(username);
    let emailTest = email !== '' && (/^\w+([[\.-]?\w+]{3,15})*@\w+([[\.-]?\w+]{2,10})*(\.\w{2,3})+$/.test(email));

    if (!usernameTest) {
      ToastNotifyError('Entrer un username correct !');
    }
    if (!emailTest) {
      ToastNotifyError('Entrer une adresse mail correct !');
    }
    if (password !== passwordConfirm) {
      ToastNotifyError('Le mot de passe et la confirmation doivent etre similaire !');
    }
    if (usernameTest && emailTest && password === passwordConfirm) {
      dispatch(saveUser({ username, email, password: passwordConfirm }));
    }
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
            <input type="text" ref={usernameField} placeholder='Enter your username' className='input-field' id='username' name='username' />
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="text" ref={emailField} placeholder='Enter your email' className='input-field' id='email' name='email' autoComplete='off' />
          </div>
          <div className='form-group'>
            <label htmlFor="password">New Password</label>
            <input type="password" ref={passwordField} placeholder='Enter new password' className='input-field' id='password' name='password' autoComplete='off' />
          </div>
          <div className='form-group'>
            <label htmlFor="password_confirm">Confirm Password</label>
            <input type="password" ref={confirmPasswordField} placeholder='Retype your password' className='input-field' id='password-confirm' name='password-confirm' autoComplete="off" />
          </div>
          <div className='form-group'>
            <input type="submit" value="Signup" className='btn-signup' id='btn-signup' name='btn-signup' />
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