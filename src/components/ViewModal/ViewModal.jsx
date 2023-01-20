import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./ViewModal.css";
import { Row, Col } from "react-bootstrap";

const ViewModal = ({ applicationData, show, toggleShow }) => {
  // applicationData = {
  //   "projectName": "NAME",
  //   "typeOfProject": "Personal Project",
  //   "hashtags": ["ML", "AI", "Web Dev"],
  //   "positionName": "FrontEnd Developer",
  //   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
  //   "wage": 10,
  //   "deadline": "DEADLINE",
  //   "datePosted": "POSTED DATE",
  //   "user": "USER",
  //   "contactInfo": "sengdao@boss.com",
  //   "timeline": "TIMELINE",
  //   "numberOfPeople": 5,
  //   "skillsRequired": ["Python", "Flask", "HTML"]
  // }

  //   const [show, setShow] = useState(false)
  //   const handleClose = () => setShow(false)
  //   const handleShow = () => setShow(true)

  return (
    <Modal show={show} onHide={toggleShow} className="modal">
      <Modal.Header className="modal_header" closeButton>
        <Modal.Title>{applicationData.projectName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_body">
        
        <h5>Details</h5>
        <Row>
          <Col lg={6} sm={12}>
            <b>Position:</b> {applicationData.positionName || "N/A"}
          </Col>
          <Col lg={6} sm={12}>
            <b>Wage ($/hr):</b> {applicationData.wage || "0"}
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <b>Type:</b> {applicationData.typeOfProject  || "N/A"}
          </Col>
          <Col lg={6} sm={12}>
            <b>No. of People:</b> {applicationData.numberOfPeople || "N/A"}
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <b>Start Date:</b> {applicationData.startDate || "N/A"}
          </Col>
          <Col lg={6} sm={12}>
            <b>End Date:</b> {applicationData.endDate || "N/A"}
          </Col>
        </Row>
        <Row>
        <Col lg={6} sm={12}>
            <b>Date Posted:</b> {applicationData.datePosted || "N/A"}
          </Col>
          <Col lg={6} sm={12}>
            <b>Deadline:</b> {applicationData.dateToSubmit || "N/A"}
          </Col>
        </Row>
        <hr />
        <h5>Skills</h5>
        <ul className="skills">
          {applicationData.skillsRequired.map((skill, id) => {
            return (
              <li className="skill" key={id}>
                {skill}
              </li>
            );
          })}
        </ul>
        <hr />
        <h5>Hashtags</h5>
        <ul className="skills">
          {applicationData.hashtags.map((hashtag, id) => {
            return (
              <li className="skill" key={id}>
                {hashtag}
              </li>
            );
          })}
        </ul>
        <hr />
        <h5>Description</h5>
        <p>{applicationData.description || "No description found."}</p>
      </Modal.Body>
      <Modal.Footer>
        <p>
          <b>Contact Info:</b> {applicationData.contactInfo || "N/A"}
        </p>
        <Button
          style={{
            backgroundColor: "blueviolet",
            border: "none",
          }}
          onClick={toggleShow}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/*

project name, type of project, position name, description, wage, deadline, posted date, 
contactinfo, job timeline, number of people, skills required

*/

export default ViewModal;
