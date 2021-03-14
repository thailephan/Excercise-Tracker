import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from '../utils/axios_configured';

export default function CreateExcercise() {
  const [username, setUsername] = useState('');
  const usernameInputRef = useRef(null);
  const history = useHistory();

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const user = {
      username,
    };

    console.log(user);
    axios
      .post('/users/add', {
        ...user,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setUsername('');
    history.push('/');
    usernameInputRef.current.blur();
  }
  return (
    <div>
      <h1>Create new user</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            ref={usernameInputRef}
            name='username'
            id='username'
            onChange={onChangeUsername}
            value={username}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Create user
          </button>
        </div>
      </form>
    </div>
  );
}
