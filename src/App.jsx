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
  let cards = null;
  if (data) {
    jobs = data[0];
    users = data[1];
    cards = Object.values(jobs).map((card, i) => {
      return (
        <CardApp key={i} projectName={card.projectName} positionName={card.positionName} description={card.description} datePosted={card.datePosted}
        hashtags={card.hashtags}/>
      )
    });
  }
  return (
    <div className="App">
      <NavbarApp />
      {cards}
    </div>
  );
};

export default App;
