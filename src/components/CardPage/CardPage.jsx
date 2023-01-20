import CardApp from "./Card";
import Database from "../Database";
import { useState, useEffect } from "react";
import { useDbData } from "../../utilities/firebase";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"; // import logo from '../logo.svg';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import "./Card.css";

export default function CardPageApp() {
  const [data, error] = useDbData();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    let filteredJobs = Object.values(data.jobs).filter((job) => {
      return (
        job.positionName.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase()) ||
        job.projectName.toLowerCase().includes(search.toLowerCase()) ||
        job.skillsRequired.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        ) ||
        job.hashtags.some((keyword) =>
          keyword.toLowerCase().includes(search.toLowerCase())
        )
      );
    });

    if (filters.length > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        return job.skillsRequired.some((skill) => filters.includes(skill));
      });
    }

    setFilteredJobs(
      filteredJobs.sort((a, b) => {
        if (a.datePosted < b.datePosted) {
          return 1;
        }
        if (a.datePosted > b.datePosted) {
          return -1;
        }
        return 0;
      })
    );
  }, [data, search]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const handleFiltersChange = (selectedOptions) => {
    setFilters(selectedOptions.selectedValue);
  };

  const search_comp = () => {
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

          <BootstrapSelect
            isMultiSelect
            placeholder="Filter by skills"
            selectStyle="btn btn-primary"
            style={{ marginLeft: "5px" }}
            options={[
              {
                labelKey: "facebook",
                value: "Facebook",
                style: { "font-size": "15px" },
              },
              {
                labelKey: "javascript",
                value: "JavaScript",
                style: { "font-size": "15px" },
              },
              {
                labelKey: "python",
                value: "Python",
                style: { "font-size": "15px" },
              },
              {
                labelKey: "htmlcss",
                value: "HTML/CSS",
                style: { "font-size": "15px" },
              },
            ]}
            onChange={handleFiltersChange}
          />
        </Form>
      </div>
    );
  };

  return (
    <>
      {search_comp()}
      {filteredJobs.map((job, key) => (
        <CardApp key={key} data={job} />
      ))}
    </>
  );
}
