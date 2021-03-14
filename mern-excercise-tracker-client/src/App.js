import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import ExcerciseList from './components/ExcerciseList';
import EditExcercise from './components/EditExcercise';
import CreateExcercise from './components/CreateExcercise';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Route path='/' exact component={ExcerciseList} />
        <Route path='/edit/:id' exact component={EditExcercise} />
        <Route path='/create' exact component={CreateExcercise} />
        <Route path='/user' exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
