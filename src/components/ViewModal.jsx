import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ViewModal = ({ applicationData, show, toggleShow }) => {
  let applicationData = {
    "name": "NAME",
    "projectType": "Personal Project",
    "positionName": "FrontEnd Developer",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
    "wage": 10,
    "deadline": "DEADLINE",
    "postedDate": "POSTED DATE",
    "contactInfo": "sengdao@boss.com",
    "timeline": "TIMELINE",
    "numPeople": 5,
    "requiredSkills": ["Python", "Flask", "HTML"]
  }

//   const [show, setShow] = useState(false)
//   const handleClose = () => setShow(false)
//   const handleShow = () => setShow(true)

  return (
    <Modal
        show={show}
        onHide={toggleShow}
    >
        <Modal.Header>

        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={toggleShow}>
                Close
            </Button>
        </Modal.Footer>
        <div>ViewModal</div>
        <p>{applicationData.name}</p>
    </Modal>

  )
}

/*

project name, type of project, position name, description, wage, deadline, posted date, 
contactinfo, job timeline, number of people, skills required

*/

export default ViewModal