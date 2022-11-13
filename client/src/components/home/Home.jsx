import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillMessage } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
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
            <div className='sidebar'>
              <div className='connected-user-img-container'>
                <img alt="user-img" src={Image} className='connected-user-img' />
              </div>
              <div className='message-icon'>
                <AiFillMessage size={40} color='white' />
              </div>
              <div className='logout-icon'>
                <MdLogout size={40} color='white' />
              </div>
            </div>
            <div className='center-column'>
              <div>
                <input type="text" placeholder='search' />
                <FiSearch />
                <BsThreeDotsVertical />
              </div>
            </div>
            <div></div>
          </div>
        )
      }
    </>
  )
}

export default Home;