import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarApp from './components/Navbar/Navbar';
import CardApp from './components/Card/Card';
import Database from './components/Database';

const App = () => {
  const data = Database();
  let jobs = null;
  let users = null;
  let cards = null;
  if (data) {
    jobs = data[0];
    users = data[1];
    cards = Object.values(jobs).map((card, i) => {
      return (
        <CardApp key={i} data={card}/>
      )
    });
  }
  return (
    <div className="App">
      <NavbarApp />
      {cards}
      <br/>
    </div>
  );
};

export default App;
