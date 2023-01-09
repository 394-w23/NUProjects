import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarApp from './components/Navbar/Navbar';
import CardPage from './components/CardPage/CardPage'

const App = () => {
  return (
    <div className="App">
      <NavbarApp />
      <CardPage />
      <br/>
    </div>
  );
};

export default App;
