import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./AddModal.css";
import { Row, Col } from "react-bootstrap";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { useInput } from "../../hooks/useInput";

const AddModal = ({ show, toggleShow }) => {
  //   const [show, setShow] = useState(false)
  //   const handleClose = () => setShow(false)
  //   const handleShow = () => setShow(true)

  // const [projectName, setProjectName] = useState("");
  const projectName = useInput("");
  const typeOfProject = useInput("");
  const positionName = useInput("");
  const description = useInput("");
  const wage = useInput(0);
  const deadline = useInput((new Date()).getTime());
  const datePosted = useInput((new Date()).getTime());
  const contactInfo = useInput("");
  const timeline = useInput(0);
  const numberOfPeople = useInput(0);
  const skillsRequired = useInput([]);

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

  return (
    <Modal show={show} onHide={toggleShow} className="modal">
      <Modal.Header className="modal_header" closeButton>
        <Modal.Title>Create new project</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_body">
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Project name</Form.Label>
          <Form.Control type="email" placeholder="Enter project name" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Type of project</Form.Label>
          <Form.Select aria-label="Default select project type">
          <option>Select a type of project</option>
          <option value="personal">Personal</option>
          <option value="research">Research</option>
          <option value="job">Job</option>
        </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Position name</Form.Label>
          <Form.Control type="text" placeholder="ML/AI, Web Dev, Hardware" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Position name</Form.Label>
          <Form.Control type="text" placeholder="ML/AI, Web Dev, Hardware" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

      </Form>
      </Modal.Body>
      <Modal.Footer className="add-modal-footer">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* <Button
          style={{
            backgroundColor: "blueviolet",
            border: "none",
          }}
          onClick={toggleShow}
        >
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

/*

project name, type of project, position name, description, wage, deadline, posted date, 
contactinfo, job timeline, number of people, skills required

*/

export default AddModal;
