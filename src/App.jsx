import { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarApp from "./components/Navbar";
import CardApp from "./components/Card";
import ViewModal from "./components/ViewModal/ViewModal";

//

const App = () => {
  return (
    <div className="App">
      <NavbarApp />
      <CardApp
        projectName="NU Dance Marathon"
        positionName="Front-end Developer"
        description="Description here..."
        datePosted="2 days ago"
        tags={["#frontend", "#dancemarathon"]}
      />
    </div>
  );
};

export default App;
