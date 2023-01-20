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
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import "./Card.css"

export default function CardPageApp() {
  const [data, error] = useDbData();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
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

  const handleFiltersChange = (selectedOptions) => {
    setFilters(selectedOptions.selectedValue);
  }

  let search_comp = () => {
    return (
      <div className="search-area">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search positions..."
          className="me-2"
          aria-label="Search"
          // v-if="searchEnabled" 
          // role="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-success" className="search-button">
          Search
        </Button>

        <BootstrapSelect isMultiSelect placeholder="Filter by skills" selectStyle="btn btn-primary" style={{marginLeft:'5px'}} options={[
        {
          "labelKey": "facebook",
          "value": "Facebook",
          "style": {"font-size":"15px"}
        },
        {
          "labelKey": "javascript",
          "value": "JavaScript",
          "style": {"font-size":"15px"}
        },
        {
          "labelKey": "python",
          "value": "Python",
          "style": {"font-size":"15px"}
        },
        {
          "labelKey": "htmlcss",
          "value": "HTML/CSS",
          "style": {"font-size":"15px"}
        },
        ]} onChange={handleFiltersChange}/>

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
      // search in all job fields and keywords
      job.jobTitle = job.projectName|| "";
      job.jobDescription = job.jobDescription || "";
      job.datePosted = job.datePosted || "";
      job.companyName = job.companyName || "";  
      job.skillsRequired = job.skillsRequired || [];
      job.keywords = job.keywords || [];
      return (
        job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(search.toLowerCase()) ||
        job.datePosted.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(search.toLowerCase()) ||
        job.skillsRequired.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
        job.keywords.some(keyword => keyword.toLowerCase().includes(search.toLowerCase()))
      );

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


