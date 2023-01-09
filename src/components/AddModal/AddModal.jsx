import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./AddModal.css";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { useInput } from "../../hooks/useInput";
import { writeJobData } from "../../utilities/firebase";
import Alert from "react-bootstrap/Alert";
import Toast from 'react-bootstrap/Toast';

const AddModal = ({ show, toggleShow }) => {
  const projectName = useInput("");
  const typeOfProject = useInput("");
  const positionName = useInput("");
  const description = useInput("");
  const wage = useInput(0);
  const deadline = useInput("");
  const numberOfPeople = useInput(0);

  const [skillsRequired, setSkillsRequired] = useState([]);
  const [hashtags, setHashTags] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const clearValues = () => {
    projectName.setValue("");
    typeOfProject.setValue("");
    positionName.setValue("");
    description.setValue("");
    wage.setValue(0);
    deadline.setValue("");
    numberOfPeople.setValue(0);
    setSkillsRequired([]);
    setHashTags([]);
  }
  const handleSubmit = (event) => {
    // check if all form fields required are entered
    // print all fields
    // console.log([projectName.value]);
    if ((!projectName.value) || (!typeOfProject.value) || (!positionName.value) || (!description.value)) {
      setShowToast(true);
    } else {
      closeModal();

      const params = {
        jobId: Math.floor(Math.random()*10000),
        contactInfo: "Test@email.com",
        dateToSubmit: deadline.value,
        datePosted: new Date(),
        description: description.value,
        hashtags: hashtags,
        numberOfPeople: numberOfPeople.value,
        positionName: positionName.value,
        projectName: projectName.value,
        skillsRequired: skillsRequired,
        startDate: new Date(),
        endDate: new Date(),
        typeOfProject: typeOfProject.value,
        user: "John Doe",
        wage: wage.value
      }

      writeJobData(params);
      clearValues();
    }
  };

  const closeModal = () => {
    toggleShow(); 
    setShowToast(false);
  }

  return (
    <Modal show={show} onHide={closeModal} className="modal">
      <Modal.Header className="modal_header" closeButton>
        <Modal.Title>Create new project</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_body">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Project name*</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter project name"
              onChange={projectName.onChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type of project*</Form.Label>
            <Form.Select
              aria-label="Default select project type"
              onChange={typeOfProject.onChange}
              required
            >
              <option value="">Select a type of project</option>
              <option value="Personal">Personal</option>
              <option value="Research">Research</option>
              <option value="Job">Job</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Front-End Developer, ML Engineer, Data Scientist"
              onChange={positionName.onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Application Deadline</Form.Label>
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

          <Form.Group className="mb-3">
            <Form.Label>Wage ($/hr)</Form.Label>
            <Form.Control
              type="number"
              value={wage.value}
              onChange={wage.onChange}
              min={0}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description*</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={description.onChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Required Skills</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={skillsRequired}
              onChange={e => setSkillsRequired([].slice.call(e.target.selectedOptions).map(item => item.value))}
            >
              <option value="HTML/CSS">HTML/CSS</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={hashtags}
              onChange={e => setHashTags([].slice.call(e.target.selectedOptions).map(item => item.value))}
            >
              <option value="Web Development">Web Development</option>
              <option value="ML/AI">ML/AI</option>
              <option value="Hardware">Hardware</option>
            </Form.Control>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer className="add-modal-footer">
      {showToast ?
          <Alert>
              Your form is incomplete. Please fill out all required (*) fields.
          </Alert>
          : <div></div>}
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
