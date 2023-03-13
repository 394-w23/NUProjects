import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useDbData } from "../../utilities/firebase";
import AddButton from "../AddButton/AddButton";
import CardApp from "./Card";
import "./CardPage.css";
import Alert from 'react-bootstrap/Alert';

export default function CardPageApp() {
  const [data, error] = useDbData();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [sortKey, setSortKey] = useState("datePosted");
  const [showAlert, setShowAlert] = useState(false);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const sortComparator = useCallback(
    (a, b) => {
      if (!a || !b) {
        return 0;
      }
      return new Date(a[sortKey]) - new Date(b[sortKey]);
    },
    [sortKey]
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    let filteredJobs = Object.values(data.jobs).filter((job) => {
    // remove all spaces from search string
    // remove special characters from search string
    let searchWithoutSpaces = search.replace(/\s+/g, '').replace(/[^\w\s]/gi, '');
    // check if searchWithoutSpaces is also equal to job properties without spaces
      return (
        job.positionName.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase()) ||
        job.projectName.toLowerCase().includes(search.toLowerCase()) ||
        job.skillsRequired.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        ) ||
        job.hashtags.some((keyword) =>
        keyword.toLowerCase().includes(searchWithoutSpaces.toLowerCase())
        ) ||
        job.projectName.replace(/\s+/g, '').toLowerCase().includes(searchWithoutSpaces.toLowerCase()) ||
        job.positionName.replace(/\s+/g, '').toLowerCase().includes(searchWithoutSpaces.toLowerCase()) ||
        job.description.replace(/\s+/g, '').toLowerCase().includes(searchWithoutSpaces.toLowerCase()) ||
        job.skillsRequired.some((skill) =>
          skill.replace(/\s+/g, '').toLowerCase().includes(searchWithoutSpaces.toLowerCase())
        )
      );
    });

    if (filters.length > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        return job.skillsRequired.some((skill) => filters.includes(skill));
      });
    }

    setFilteredJobs(filteredJobs.sort(sortComparator));
  }, [data, search, sortComparator, filters]);

  const handleFiltersChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFilters(selected);
  };

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
  };
  //apply style to mobile view only
  const styleRow = {
    '@media (max-width: 600px)': {
        gap: "15px"
    }
}


  const renderSearchArea = () => {
    return (
      <div className="search-area">
        <Form className="d-flex" onSubmit={(event) => event.preventDefault()}>
          <Row style={styleRow}>
            <Form.Group as={Col} md={8}>
              <Form.Control
                type="search"
                placeholder="Search positions..."
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="form-element"
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Select onChange={handleSortChange} data-cy="sorting-button" className="form-element">
                <option value="datePosted" defaultChecked>
                  Sort by date posted
                </option>
                <option value="dateToSubmit" defaultChecked>
                  Sort by application deadline
                </option>
                <option value="projectStartDate">Sort by start date</option>
                <option value="projectEndDate">Sort by end date</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md={2}>
            <select data-cy="filtering-button" multiple onChange={handleFiltersChange}>
              <option value="Agile">Agile</option>
              <option value="AWS">AWS</option>
              <option value="Azure">Azure</option>
              <option value="C">C</option>
              <option value="C#">C#</option>
              <option value="C++">C++</option>
              <option value="Git">Git</option>
              <option value="HTML/CSS">HTML/CSS</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
              <option value="React">React</option>
              <option value="Scrum">Scrum</option>
              <option value="SQL">SQL</option>
            </select>
            </Form.Group>
          </Row>
        </Form>
      </div>
    );
  };

  return (
    <Container fluid className="px-4 py-4 d-flex flex-column gap-3">
      {renderSearchArea()}
      <AddButton alertShower={setShowAlert} />
      <Alert variant="success" show={showAlert}>
        Job successfully added!
      </Alert>
      <div className="d-flex flex-column gap-3">
        {filteredJobs.map((job, key) => (
          <CardApp key={key} data={job} />
        ))}
      </div>
    </Container>
  );
}
