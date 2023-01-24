import { useState } from "react";
import logo from "./logo.svg";
import Routing from "./Routing";
import "./App.css";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <Routing />
      </div>
    </UserProvider>
  );
};

export default App;
