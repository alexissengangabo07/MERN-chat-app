import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AiFillMessage, AiOutlineSend } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { FiSearch, FiCamera } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import Loader from '../loader/Loader';
import { logOut, reset, authSlice } from '../../feature/auth.slice';
import Image from './nba yb.jpeg';
import './style.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError } = useSelector(store => store.auth);

  useEffect(() => {
    // dispatch(fetchUsers());
    console.log(user, isError)
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  const onLogOut = () => {
    dispatch(logOut());
    dispatch(reset());
  }


  return (
    <>
      <main className='home-container'>
        {/* <button onClick={notify}>Notify!</button> */}
        <aside className='sidebar'>
          <div className='connected-user-img-container'>
            <img alt="user-img" src={Image} className='connected-user-img' />
          </div>
          <div className='message-icon'>
            <AiFillMessage size={40} color='white' />
          </div>
          <div className='logout-icon' onClick={onLogOut}>
            <MdLogout size={40} color='white' className='inner-logout-icon' />
          </div>
        </aside>
        <article className='column-center'>
          <div className='serch-box-container'>
            <div className='search-icon' >
              <FiSearch />
            </div>
            <div className='dot-icon'>
              <BsThreeDotsVertical />
            </div>
            <input type="text" className='search-box' placeholder='Search' />
          </div>
          <div className='recent-list-container'>
            <div>
              <h4>Recent</h4>
            </div>
            <div className='user-list'>
              <div className='user-infos'>
                <div>
                  <img alt="user-img" src={Image} className='user-list-img' />
                </div>
                <div>
                  <h4>Ragnar</h4>
                  <p className='message-overview'>Dinner ?</p>
                </div>
              </div>
              <div className='user-infos'>
                <div>
                  <img alt="user-img" src={Image} className='user-list-img' />
                </div>
                <div>
                  <h4>Ragnar</h4>
                  <p className='message-overview'>Dinner ?</p>
                </div>
              </div>
              <div className='user-infos'>
                <div>
                  <img alt="user-img" src={Image} className='user-list-img' />
                </div>
                <div>
                  <h4>Ragnar</h4>
                  <p className='message-overview'>Dinner ?</p>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className='inbox-block'>
          <section className='inbox-header'>
            <div style={{ position: 'relative' }}>
              <img alt="user-img" src={Image} className='connected-user-img' />
              <div className='active-icon'>
                <GoPrimitiveDot size={25} color='green' />
              </div>
            </div>
            <div>
              <h3>{user?.username}</h3>
              <p>Online</p>
              {/* <div>
                    <EmojiPicker />
                  </div> */}
            </div>
          </section>
          <section className='chat-section'>
            <div className='message-container'>
              <div className='message-box message-box-left'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quae.</p>
              </div>
              <p>Today 02:25pm</p>
            </div>
            <div className='message-container message-right'>
              <div className='message-box message-box-right'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quae.</p>
              </div>
              <p>Today 02:25pm</p>
            </div>
            <div className='message-container message-left'>
              <div className='message-box message-box-left'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quae.</p>
              </div>
              <p>Today 02:25pm</p>
            </div>
            <div className='message-container message-right'>
              <div className='message-box message-box-right'>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <p>Today 02:25pm</p>
            </div>
            <div className='message-container message-left'>
              <div className='message-box message-box-left'>
                <p>Lorem, ipsum..</p>
              </div>
              <p>Today 02:25pm</p>
            </div>
            <div className='message-container message-right'>
              <div className='message-box message-box-right'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem?.</p>
              </div>
              <p>Today 02:25pm</p>
            </div>
          </section>
          <section className='chat-footer'>
            <form className='chat-form'>
              <textarea className='chat-textarea'></textarea>
              <button type='submit' className='btn-send'>< AiOutlineSend /></button>
              <div className='camera-icon'>
                <FiCamera />
              </div>
            </form>
          </section>
        </article>
      </main>
    </>
  )
}

export default Home;