import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AiFillMessage, AiOutlineSend } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { FiSearch, FiCamera } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { logOut, reset } from '../../feature/auth.slice';
import { fetchUsers } from '../../feature/users.slice';
import { fetchUsersMessages } from '../../feature/messages.slice';
import Image from './default_avatar.jpg';
import './style.css';
import Loader from '../loader/Loader';
import MessageLoader from './messageLoader/MessageLoader';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(store => store.auth);
  const users = useSelector(store => store.usersInfos);
  const { messagesData, isMessageLoading } = useSelector(store => store.messagesReducer);

  const [loadChat, setLoadChat] = useState({
    expediteur: user.id,
    destinateurId: null,
    destinateurUsername: null,
    isOpened: false
  });
  const messageInputField = useRef(null);

  useEffect(() => {
    dispatch(fetchUsers(user.token));
    if (user === null) {
      navigate('/login');
    }
  }, []);

  const selectUser = (destinateurId, destinateurUsername) => {
    setLoadChat({
      isOpened: true,
      destinateurId,
      destinateurUsername
    });
    dispatch(fetchUsersMessages({ expediteur: user.id, destinateurId, destinateur: destinateurId }));
    // dispatch()
  }

  const sendMessage = (exped, dest) => {
    let messageContent = messageInputField.current.value;
    console.log(exped, dest, messageContent);
  }

  const onLogOut = () => {
    dispatch(logOut());
    dispatch(reset());
  }

  if (users.isLoading) {
    return (
      <Loader />
    )
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
            <div className='fixed-title'>
              <h4>Recents</h4>
            </div>
            <div className='user-list'>
              {users.data.map((data, index) => (
                <div className='user-infos' key={index} onClick={() => selectUser(data._id, data.username)}>
                  <div>
                    <img alt="user-img" src={Image} className='user-list-img' />
                  </div>
                  <div>
                    <h4>{data.username}</h4>
                    <p className='message-overview'>Dinner ?</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
        <article className='inbox-block'>
          {loadChat.isOpened && (
            <>
              <section className='inbox-header'>
                <div style={{ position: 'relative' }}>
                  <img alt="user-img" src={Image} className='connected-user-img' />
                  <div className='active-icon'>
                    <GoPrimitiveDot size={25} color='green' />
                  </div>
                </div>
                <div>
                  <h3>{loadChat.destinateurUsername}</h3>
                  <p>Online</p>
                </div>
              </section>

              <section className='chat-section'>
                {isMessageLoading ? (
                  <>
                    <MessageLoader />
                  </>
                ) :
                  (
                    <>
                      {messagesData.map((message, index) => {
                        if (message?.expediteur || message?.destinateur) {
                          return (
                            <div key={index} className={user.id === message?.expediteur._id ? 'message-container' : 'message-container message-right'}>
                              <div className={user.id === message?.expediteur._id ? 'message-box message-box-left' : 'message-box message-box-right'}>
                                <p>{message?.messageContent}</p>
                              </div>
                              <p>{message?.createdAt}</p>
                            </div>
                          )
                        }
                      }
                      )}
                    </>
                  )}
              </section>

              <section className='chat-footer'>
                <form className='chat-form' onSubmit={(e) => { e.preventDefault(); sendMessage(user.id, loadChat.destinateurId) }}>
                  <textarea className='chat-textarea' ref={messageInputField}></textarea>
                  <button type='submit' className='btn-send'>< AiOutlineSend /></button>
                  <div className='camera-icon'>
                    <FiCamera />
                  </div>
                </form>
              </section>
            </>
          )}
        </article>
      </main>
    </>
  )
}

export default Chat;