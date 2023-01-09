import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./AddModal.css";
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
  const deadline = useInput("");
  const numberOfPeople = useInput(0);
  const skillsRequired = useInput([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log();
  };

  return (
    <Modal show={show} onHide={toggleShow} className="modal">
      <Modal.Header className="modal_header" closeButton>
        <Modal.Title>Create new project</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_body">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Project name</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter project name"
              onChange={projectName.onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type of project</Form.Label>
            <Form.Select
              aria-label="Default select project type"
              onChange={typeOfProject.onChange}
            >
              <option value="">Select a type of project</option>
              <option value="personal">Personal</option>
              <option value="research">Research</option>
              <option value="job">Job</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position name</Form.Label>
            <Form.Control
              type="text"
              placeholder="ML/AI, Web Dev, Hardware"
              onChange={positionName.onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={description.onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Wage $$$</Form.Label>
            <Form.Control
              type="number"
              value={wage.value}
              onChange={wage.onChange}
              min={0}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deadline</Form.Label>
            <Form.Control type="date" onChange={deadline.onChange} min={0} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of People</Form.Label>
            <Form.Control
              type="number"
              value={numberOfPeople.value}
              onChange={numberOfPeople.onChange}
              min={0}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="add-modal-footer">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/*

project name, type of project, position name, description, wage, deadline, posted date, 
contactinfo, job timeline, number of people, skills required

*/

export default AddModal;
