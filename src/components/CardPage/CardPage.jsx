import CardApp from "./Card";
import Database from "../Database";
import { useState, useEffect } from "react";
import { useDbData } from '../../utilities/firebase';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"; // import logo from '../logo.svg';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


export default function CardPageApp() {
  const [data, error] = useDbData();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(["Facebook", "Python"]);
  console.log(data);
  let jobs = null;
  let users = null;
  let cards = null;
  function compare(a, b) {
    if (a.datePosted < b.datePosted){
      return 1;
    }
    if (a.datePosted > b.datePosted){
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    console.log(filters)
  }, [filters])

  let search_comp = () => {
    return (
      <div className="search-area">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search positions..."
          className="me-2"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-success" className="search-button">
          Search
        </Button>
        <DropdownButton
          id="dropdown-basic-button"
          className="filter-button"
          title="Filter"
          onChange={e => setFilters([].slice.call(e.target.selectedOptions).map(item => item.value))}
        >
          <Dropdown.Item href="#/action-1">Facebook</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Python</Dropdown.Item>
          <Dropdown.Item href="#/action-3">JavaScript</Dropdown.Item>
        </DropdownButton>
      </Form>
    </div>  );
  }
  if (data) {
    jobs = data.jobs;
    console.log(jobs);
    users = data.users;
    jobs = Object.values(jobs);
    jobs.sort(compare);
    jobs = jobs.filter((job) => {
      console.log(job)
      return job.positionName.toLowerCase().includes(search.toLowerCase());
    })
    
    if (filters.length > 0) {
      jobs = jobs.filter((job) => {
        return job.skillsRequired.some(skill => filters.includes(skill));
      });
    }
    
    cards = jobs.map((card, i) => {
      return <CardApp key={i} data={card} />;
    });
  }
  return <>
  {search_comp()}
  {cards}</>;
}


