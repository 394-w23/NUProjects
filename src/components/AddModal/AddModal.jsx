import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./AddModal.css";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { useInput } from "../../hooks/useInput";
import { writeJobData } from "../../utilities/firebase";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "../../utilities/firebase";

const AddModal = ({ show, toggleShow }) => {
  const projectName = useInput("");
  const typeOfProject = useInput("");
  const positionName = useInput("");
  const description = useInput("");
  const wage = useInput(0);
  const deadline = useInput("");
  const startDate = useInput("");
  const endDate = useInput("");
  const numberOfPeople = useInput(0);

  const [user] = useAuthState();
  const [skillsRequired, setSkillsRequired] = useState([""]);
  const [hashtags, setHashTags] = useState([""]);
  const [showToast, setShowToast] = useState(false);
  const [ShowNegToast, setShowNegToast] = useState(false);

  const clearValues = () => {
    projectName.setValue("");
    typeOfProject.setValue("");
    positionName.setValue("");
    description.setValue("");
    wage.setValue(0);
    deadline.setValue("");
    startDate.setValue("");
    endDate.setValue("");
    numberOfPeople.setValue(0);
    setSkillsRequired([" "]);
    setHashTags([" "]);
  };
  const handleSubmit = (event) => {
    // check if all form fields required are entered
    if (
      !projectName.value ||
      !typeOfProject.value ||
      !positionName.value ||
      !description.value ||
      skillsRequired.length == 0 ||
      hashtags.length == 0
    ) {
      setShowToast(true);
      setShowNegToast(false);
    } else if (wage.value < 0 || numberOfPeople.value < 0) {
      setShowNegToast(true);
      setShowToast(false);
    } else {
      closeModal();

      const params = {
        jobId: uuidv4(),
        contactInfo: user.email,
        dateToSubmit: deadline.value,
        projectStartDate: startDate.value,
        projectEndDate: endDate.value,
        datePosted: new Date(),
        description: description.value,
        hashtags: hashtags,
        numberOfPeople: numberOfPeople.value,
        positionName: positionName.value,
        projectName: projectName.value,
        skillsRequired: skillsRequired,
        typeOfProject: typeOfProject.value,
        user: user.displayName,
        wage: wage.value,
      };

      console.log("SUBMITTED FORM PARAMS: ", Object.values(params));

      writeJobData(params);
      clearValues();
    }
  };

  const closeModal = () => {
    toggleShow();
    setShowToast(false);
    setShowNegToast(false);
  };

  const handleSkillsChange = (selectedOptions) => {
    setSkillsRequired(selectedOptions.selectedValue);
  };

  const handleTagsChange = (selectedOptions) => {
    setHashTags(selectedOptions.selectedValue);
  };

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
            <Form.Label>Application Deadline*</Form.Label>
            <Form.Control type="date" onChange={deadline.onChange} requireds />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Start Date</Form.Label>
            <Form.Control type="date" onChange={startDate.onChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project End Date</Form.Label>
            <Form.Control type="date" onChange={endDate.onChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of People*</Form.Label>
            <Form.Control
              type="number"
              value={numberOfPeople.value}
              onChange={numberOfPeople.onChange}
              min={0}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Wage ($/hr)</Form.Label>
            <Form.Control
              type="number"
              value={wage.value}
              onChange={wage.onChange}
              min={0}
              oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
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
            <Form.Label>Required Skills*</Form.Label>
            <br></br>
            <BootstrapSelect
              required
              isMultiSelect
              showTick
              showSearch
              options={[
                {
                  labelKey: "htmlcss",
                  value: "HTML/CSS",
                  style: { "font-size": "15px" },
                },
                {
                  labelKey: "python",
                  value: "Python",
                  style: { "font-size": "15px" },
                },
                {
                  labelKey: "javascript",
                  value: "JavaScript",
                  style: { "font-size": "15px" },
                },
              ]}
              onChange={handleSkillsChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags*</Form.Label>
            <br></br>
            <BootstrapSelect
              required
              isMultiSelect
              showTick
              showSearch
              options={[
                {
                  labelKey: "mlai",
                  value: "#ML/AI",
                  style: { "font-size": "15px" },
                },
                {
                  labelKey: "webdevelopment",
                  value: "#WebDevelopment",
                  style: { "font-size": "15px" },
                },
                {
                  labelKey: "hardware",
                  value: "#Hardware",
                  style: { "font-size": "15px" },
                },
              ]}
              onChange={handleTagsChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="add-modal-footer">
        {showToast ? (
          <Alert>
            Your form is <b>incomplete</b>. Please fill out all required (*)
            fields.
          </Alert>
        ) : (
          <div></div>
        )}
        {ShowNegToast ? (
          <Alert>
            Your cannot enter a <b>negative</b> wage or number of people. Please
            enter a value of 0 or greater.
          </Alert>
        ) : (
          <div></div>
        )}
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
