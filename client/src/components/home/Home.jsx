import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../feature/users.slice';
import Loader from '../loader/Loader';

import './style.css';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector(store => store.connectedUserInfos);

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
          <div>
            <h2>Home</h2>
            <hr />
            <h4>User : </h4>
            <div>
              <ul>
                <li>okoko</li>
                {users.data.map((user, index) => (
                  <li key={index}>{user.username}</li>
                ))}
              </ul>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Home;