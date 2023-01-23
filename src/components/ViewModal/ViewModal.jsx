import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./ViewModal.css";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { useDbUpdate } from "../../utilities/firebase";

const ViewModal = ({ applicationData, show, toggleShow }) => {

  const { user, setUserFromDatabase, updateUser } = useContext(UserContext);
  const [isSaved, setIsSaved] = useState(user && user.jobsSaved ? user.jobsSaved.some((jobId) => jobId === applicationData.jobId) : false);

  const saveJob = () => {
    const updates = {};
    let userSavedJobs = user.jobsSaved ? user.jobsSaved : [];
    userSavedJobs.push(applicationData.jobId);
    updates['users/' + user.userId + '/jobsSaved'] = userSavedJobs;
    useDbUpdate(updates);
    updateUser(user);

    setIsSaved(!isSaved);
  }

  const unsaveJob = () => {
    const updates = {};
    let userSavedJobs = user.jobsSaved ? user.jobsSaved : [];
    userSavedJobs = userSavedJobs.filter((jobId) => {console.log(jobId); jobId !== applicationData.jobId});
    console.log(userSavedJobs)
    updates['users/' + user.userId + '/jobsSaved'] = userSavedJobs;
    useDbUpdate(updates);
    updateUser(user);

    setIsSaved(!isSaved);
  }

  const applyToJob = () => {

  }

  return (
    <Modal show={show} onHide={toggleShow} className="modal">
      <Modal.Header className="modal_header" closeButton>
        <Modal.Title>
          {applicationData.projectName}
          {isSaved ? 
            <FontAwesomeIcon icon={bookmarkSolid} onClick={unsaveJob}/>
            :
            <FontAwesomeIcon icon={bookmarkRegular} onClick={saveJob}/>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_body">
        <h5>Details</h5>
        <Row>
          <Col lg={6} sm={12}>
            <b>Position:</b> {applicationData.positionName}
          </Col>
          <Col lg={6} sm={12}>
            <b>Wage ($/hr):</b> {applicationData.wage}
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <b>Type:</b> {applicationData.typeOfProject}
          </Col>
          <Col lg={6} sm={12}>
            <b>Timeline:</b> {applicationData.timeline}
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <b>No. of People:</b> {applicationData.numberOfPeople}
          </Col>
          <Col lg={6} sm={12}>
            <b>Date Posted:</b> {applicationData.datePosted}
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
        <p>{applicationData.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <p>
          <b>Contact Info:</b> <a href={"mailto:"+applicationData.contactInfo}>{applicationData.contactInfo}</a>
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
