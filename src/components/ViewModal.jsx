import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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
    <Modal
        show={show}
        onHide={toggleShow}
    >
        <Modal.Header closeButton>
            <Modal.Title>{applicationData.projectName}</Modal.Title> 
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Position: {applicationData.positionName}</li>
            <li>Type of Project: {applicationData.typeOfProject}</li>

            <li>Description: {applicationData.description}</li>
            <li>Hashtags: {applicationData.hashtags}</li>
            
            <li>User: {applicationData.user}</li>
            <li>Wage: {applicationData.wage}</li>
            <li>Contact Info: {applicationData.contactInfo}</li>
            <li>Timeline: {applicationData.timeline}</li>
            <li>Number of People: {applicationData.numberOfPeople}</li>
            <li>Skills Required: {applicationData.skillsRequired}</li>
            <li>Date Posted: {applicationData.datePosted}</li>
          </ul>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={toggleShow}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

  )
}

/*

project name, type of project, position name, description, wage, deadline, posted date, 
contactinfo, job timeline, number of people, skills required

*/

export default ViewModal