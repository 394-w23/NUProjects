import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarApp from './components/Navbar/Navbar';
import CardPageApp from './components/CardPage/CardPage'
import AddButtonApp from './components/AddButton/AddButton';

const App = () => {
  return (
    <div className="App">
      <NavbarApp />
      <AddButtonApp />
      <CardPageApp />
    </div>
  );
};

export default App;
