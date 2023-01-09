import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Card.css";
import ViewModal from "./ViewModal/ViewModal";

export default function CardApp(props) {
  let applicationData = {
    projectName: "NAME",
    typeOfProject: "Personal Project",
    hashtags: ["ML", "AI", "Web Dev"],
    positionName: "FrontEnd Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
    wage: 10,
    deadline: "DEADLINE",
    datePosted: "POSTED DATE",
    user: "USER",
    contactInfo: "sengdao@boss.com",
    timeline: "TIMELINE",
    numberOfPeople: 5,
    skillsRequired: ["Python", "Flask", "HTML"],
  };
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <>
      <Card className="job-card">
        <Card.Header>{props.projectName}</Card.Header>
        <Card.Body>
          <Card.Title>{props.positionName}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <ul className="hashtags">
            {props.tags.map((tag, i) => (
              <li key={i}>{tag}</li>
            ))}
          </ul>
          <Button onClick={toggleShow} variant="primary">
            See more
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">{props.datePosted}</Card.Footer>
      </Card>
      <ViewModal
        applicationData={applicationData}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
