import CardApp from "./Card";
import React, { useState, useEffect, useCallback } from "react";
import { useDbData } from "../../utilities/firebase";
import Form from "react-bootstrap/Form";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import "./CardPage.css";
import "./Card.css";
import { Row, Col, Container } from "react-bootstrap";
import AddButton from "../AddButton/AddButton";

export default function CardPageApp() {
  const [data, error] = useDbData();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [sortKey, setSortKey] = useState("datePosted");

  const [filteredJobs, setFilteredJobs] = useState([]);

  const sortComparator = useCallback(
    (a, b) => {
      if (!a || !b) {
        return 0;
      }

      const aDate = new Date(a[sortKey]);
      const bDate = new Date(b[sortKey]);

      if (aDate < bDate) {
        return 1;
      }
      if (aDate > bDate) {
        return -1;
      }
      return 0;
    },
    [sortKey]
  );

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

    setFilteredJobs(filteredJobs.sort(sortComparator));
  }, [data, search, sortComparator, filters]);

  const handleFiltersChange = (selectedOptions) => {
    setFilters(selectedOptions.selectedValue);
  };

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
  };

  const renderSearchArea = () => {
    return (
      <div className="search-area">
        <Form className="d-flex" onSubmit={(event) => event.preventDefault()}>
          <Row>
            <Form.Group as={Col} md={8}>
              <Form.Control
                type="search"
                placeholder="Search positions..."
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Select onChange={handleSortChange}>
                <option value="datePosted" defaultChecked>
                  Sort by date posted
                </option>
                <option value="startDate">Sort by start date</option>
                <option value="endDate">Sort by end date</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <BootstrapSelect
                className="filter-multi-select"
                isMultiSelect
                showTicks
                showSearch
                placeholder="Filter by skills"
                selectStyle="btn btn-primary"
                options={[
                  {
                    labelKey: "facebook",
                    value: "Facebook",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "javascript",
                    value: "JavaScript",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "python",
                    value: "Python",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "htmlcss",
                    value: "HTML/CSS",
                    style: { fontSize: "15px" },
                  },
                ]}
                onChange={handleFiltersChange}
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
    );
  };

  return (
    <Container fluid className="px-4 py-4 d-flex flex-column gap-3">
      {renderSearchArea()}
      <AddButton />
      <div className="d-flex flex-column gap-3">
        {filteredJobs.map((job, key) => (
          <CardApp key={key} data={job} />
        ))}
      </div>
    </Container>
  );
}
