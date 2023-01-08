import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarApp from './components/Navbar';
import CardApp from './components/Card';
import { useDbData } from './utilities/firebase';
import TestDB from './components/TestDB';

const App = () => {
  const data = useDbData();
  // const cards = Object.values(data[0]['jobs']).map(card => {
  //   return (
  //     <CardApp projectName={card.projectName} positionName={card.projectName} description={card.projectName} datePosted={card.projectName}
  //     tags={card.projectName}/>
  //   )
  // });
  return (
    <div className="App">
      <NavbarApp />
      {/* {cards} */}
      <TestDB />
    </div>
  );
};

export default App;
