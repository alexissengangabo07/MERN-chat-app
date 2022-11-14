import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { AiFillMessage, AiOutlineSend } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { FiSearch, FiCamera } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { fetchUsers } from '../../feature/users.slice';
import Loader from '../loader/Loader';
import Image from './nba yb.jpeg';


import './style.css';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector(store => store.usersInfos);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      {console.log(users)}
      {users?.isLoading ? (
        <Loader />
      ) :
        (
          <div className='home-container'>
            <aside className='sidebar'>
              <div className='connected-user-img-container'>
                <img alt="user-img" src={Image} className='connected-user-img' />
              </div>
              <div className='message-icon'>
                <AiFillMessage size={40} color='white' />
              </div>
              <div className='logout-icon'>
                <MdLogout size={40} color='white' />
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
              <div className='inbox-header'>
                <div style={{ position: 'relative' }}>
                  <img alt="user-img" src={Image} className='connected-user-img' />
                  <div className='active-icon'>
                    <GoPrimitiveDot size={25} color='green' />
                  </div>
                </div>
                <div>
                  <h2>Swathi</h2>
                  <p>Online</p>
                  {/* <div>
                    <EmojiPicker />
                  </div> */}
                </div>
              </div>
              <div className='chat-container'>
                <div>
                  <div class="message-container">
                    <div class="message-body">
                      <p>Hello world! This is a test messsagen too show how to make an arrow on the side of the box.</p>
                    </div>
                  </div>
                  <p className='message-time'>Today 03:00 pm</p>
                </div>
              </div>
              <div className='chat-footer'>
                <form className='chat-form'>
                  <textarea className='chat-textarea'></textarea>
                  <button type='submit' className='btn-send'>< AiOutlineSend /></button>
                  <div className='camera-icon'>
                    <FiCamera />
                  </div>
                </form>
              </div>
            </article>
          </div>
        )
      }
    </>
  )
}

export default Home;