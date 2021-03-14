import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {useHistory} from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.min.css';

import axios from '../utils/axios_configured';

export default function CreateExcercise() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(new Date());
  const history = useHistory();

  useEffect(() => {
    axios.get('/users/').then((res) => {
      const users_fetched = res.data;
      if (users_fetched.length > 0) {
        setUsers(users_fetched.map((user) => user.username));
        setUsername(users_fetched[0].username);
      }
    });
  }, []);

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }
  function onChangeDuration(e) {
    setDuration(e.target.value);
  }
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onChangeDate(date) {
    setDate(date);
  }

  function onsubmit(e) {
    e.preventDefault();

    const excercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(excercise);
    axios
      .post('/excercises/add', excercise)
      .then((res) => console.log(res.data));

    history.push('/');
  }
  return (
    <div>
      <h3>Create new excercise</h3>
      <form onSubmit={onsubmit}>
        <div>
          <label htmlFor='username'>Username: </label>
          <select
            name='username'
            id='username'
            required
            className='form-control'
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            onChange={onChangeDescription}
            value={description}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='duration'>Duration (in minutes): </label>
          <input
            type='text'
            name='duration'
            id='duration'
            onChange={onChangeDuration}
            value={duration}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='date'>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
