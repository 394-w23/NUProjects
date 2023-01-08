import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarApp from './components/Navbar';
import CardApp from './components/Card';
import TestDB from './components/TestDB';

const App = () => {
  const data = TestDB();
  let jobs = null;
  let users = null;
    if (data) {
        jobs = data[0];
        users = data[1];
        // console.log(jobs);
        // console.log(users);
    }
  return (
    <div className="App">
      <NavbarApp />
      <CardApp />
    </div>
  );
};

export default App;
