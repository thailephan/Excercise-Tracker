import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from '../utils/axios_configured';

export default function ExcerciseList() {
  const [excercises, setExcercises] = useState([]);
  useEffect(() => {
    axios
      .get('/excercises/')
      .then((res) => setExcercises(res.data))
      .catch((err) => console.log(err));
  }, []);

  function deleteExcercise(id) {
    axios
      .delete(`excercises/${id}`)
      .then((res) => console.log(res.data));
    setExcercises(
      excercises.filter((excercise) => excercise._id !== id),
    );
  }
  // Continue working
  return (
    <div>
      <h3>Logged Excercise</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
