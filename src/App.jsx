import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarApp from './components/Navbar';
import TestDB from './components/TestDB';
//

const App = () => {
  return (
    <div className="App">
      <NavbarApp />
      <TestDB />
    </div>
  );
};

export default App;
