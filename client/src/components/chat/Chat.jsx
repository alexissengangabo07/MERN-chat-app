import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { AiFillMessage, AiOutlineSend } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { FiSearch, FiCamera } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { logOut, reset } from '../../feature/auth.slice';
import { fetchUsers } from '../../feature/users.slice';
import { fetchUsersMessages, sendMessage } from '../../feature/messages.slice';
import Image from './default_avatar.jpg';
import './style.css';
import Loader from '../loader/Loader';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(store => store.auth);
  const users = useSelector(store => store.usersInfos);
  const { messagesData } = useSelector(store => store.messagesReducer);
  const socket = useRef();

  const [loadChat, setLoadChat] = useState({
    expediteur: user?.id ? user?.id : null,
    destinateurId: null,
    destinateurUsername: null,
    isOpened: false
  });
  const messageInputField = useRef(null);
  const scrollRef = useRef(null);
  // const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    socket.current = io('https://easy-chat-api.onrender.com', { transports: ["websocket"] });
    socket.current.on('getMessage', (message) => {
      alert('got message')
      dispatch(fetchUsersMessages({
        expediteur: message.expediteurId,
        destinateur: message.destinateurId
      }));
    })
  }, [dispatch])

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
    else {
      dispatch(fetchUsers(user?.token));
      socket.current.emit('addUser', user?.id);
    }
  }, [dispatch, navigate, user]);

  const selectUser = (destinateurId, destinateurUsername) => {
    setLoadChat({
      isOpened: true,
      destinateurId,
      destinateurUsername
    });
    dispatch(fetchUsersMessages({ expediteur: user.id, destinateurId, destinateur: destinateurId }));
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', to: scrollRef.current.height });
    // scrollRef.current.style.overflowY = 'hidden';
    resetInput();
  }

  const resetInput = () => {
    if (messageInputField.current !== null) {
      messageInputField.current.value = null;
    }
  }

  const envoieMessage = (exped, dest) => {
    let messageContent = messageInputField.current.value;

    socket.current.emit('sendMessage', {
      expediteurId: exped,
      destinateurId: dest,
      messageContent
    })

    dispatch(sendMessage({
      expediteur: exped,
      destinateur: dest,
      messageContent
    }));
    resetInput();
  }

  // const uploadImage = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setUserImage(reader.result);
  //   }
  // }

  const onLogOut = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate('/login');
  }

  if (users.isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <ReactTooltip />
      <main className='home-container'>
        {/* <button onClick={notify}>Notify!</button> */}
        <aside className='sidebar'>
          <div className='connected-user-img-container'>
            <img alt="user-img" src={Image} className='connected-user-img' data-tip={`Hi, ${user?.username} !`} data-place="right" data-effect='solid' />
          </div>
          <div className='message-icon menu-active'>
            <AiFillMessage size={40} color='white' />
          </div>
          <div className='users-icon'>
            <FaUsers size={40} color='white' />
          </div>
          <div className='logout-icon' onClick={onLogOut}>
            <MdLogout size={40} color='white' className='inner-logout-icon' data-tip={`Logout`} data-place="top" data-effect='solid' />
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
              {users.data
              .filter(data => data._id !== user?.id)
              .map((data, index) => {
                  return (
                    <div className='user-infos' key={index} onClick={() => selectUser(data._id, data.username)}>
                      <div>
                        <img alt="user-img" src={Image} className='user-list-img' />
                      </div>
                      <div>
                        <h4>{data.username}</h4>
                        <p className='message-overview'>Last message...</p>
                      </div>
                    </div>
                  );
                }
              )}
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

              <section className='chat-section' ref={scrollRef}>
                {
                  (
                    <>
                      {messagesData.map((message, index) => (
                        <div key={index} className={(user.id === message?.expediteur._id || user.id === message?.expediteur) ? 'message-container message-right' : 'message-container'}>
                          <div className={(user.id === message?.expediteur._id || user.id === message?.expediteur) ? 'message-box message-box-right' : 'message-box message-box-left'}>
                            <p>{message?.messageContent}</p>
                          </div>
                          <p>{moment(message?.createdAt).locale('fr').fromNow()}</p>
                        </div>
                      )
                      )}
                    </>
                  )}
              </section>

              <section className='chat-footer'>
                <form className='chat-form' onSubmit={(e) => { e.preventDefault(); envoieMessage(user.id, loadChat.destinateurId) }}>
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