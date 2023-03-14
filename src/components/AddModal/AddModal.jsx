import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { useInput } from "../../hooks/useInput";
import { writeJobData } from "../../utilities/firebase";
import "./AddModal.css";

const AddModal = ({ show, toggleShow, alertShower }) => {
  const { user } = useAuth();

  const projectName = useInput("");
  const typeOfProject = useInput("");
  const positionName = useInput("");
  const description = useInput("");
  const wage = useInput(0);
  const deadline = useInput("");
  const startDate = useInput("");
  const endDate = useInput("");
  const numberOfPeople = useInput(0);

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
      alertShower(true);
    }
  };

  const closeModal = () => {
    toggleShow();
    setShowToast(false);
    setShowNegToast(false);
  };

  const handleSkillsChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSkillsRequired(selected);
  };

  const handleTagsChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setHashTags(selected);
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      className="modal"
      data-testid="add_modal_container"
    >
      <Modal.Header className="modal_header" closeButton>
        <Modal.Title data-testid="add_modal_title" data-cy="modal-header">
          Create new project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_body">
        <Form data-testid="add_modal_input_form">
          <Form.Group className="mb-3">
            <Form.Label>Project name*</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter project name"
              onChange={projectName.onChange}
              required
              data-cy="addmodal-projectname"
              data-testid="add_modal_project_name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type of project*</Form.Label>
            <Form.Select
              aria-label="Default select project type"
              onChange={typeOfProject.onChange}
              required
              data-cy="addmodal-projecttype"
              data-testid="add_modal_type_of_project"
            >
              <option value="">Select a type of project</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Front-End Developer, ML Engineer, Data Scientist"
              onChange={positionName.onChange}
              data-cy="addmodal-positionname"
              data-testid="add_modal_position_name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Application Deadline*</Form.Label>
            <Form.Control
              type="date"
              onChange={deadline.onChange}
              required
              data-cy="addmodal-deadline"
              data-testid="add_modal_deadline"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Start Date</Form.Label>
            <Form.Control
              type="date"
              onChange={startDate.onChange}
              data-cy="addmodal-startdate"
              data-testid="add_modal_start_date"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project End Date</Form.Label>
            <Form.Control
              type="date"
              onChange={endDate.onChange}
              data-cy="addmodal-enddate"
              data-testid="add_modal_end_date"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of People*</Form.Label>
            <Form.Control
              type="number"
              value={numberOfPeople.value}
              onChange={numberOfPeople.onChange}
              min={0}
              required
              data-cy="addmodal-numpeople"
              data-testid="add_modal_no_people"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Wage ($/hr)</Form.Label>
            <Form.Control
              type="number"
              value={wage.value}
              onChange={wage.onChange}
              min={0}
              data-cy="addmodal-wage"
              onInput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
              data-testid="add_modal_wage"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description*</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={description.onChange}
              required
              data-cy="addmodal-description"
              data-testid="add_modal_description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Skills*</Form.Label>
            <br></br>
            <select
              data-cy="addmodal-skills"
              multiple
              required
              onChange={handleSkillsChange}
              data-testid="add_modal_skills"
            >
              <option value="Agile">Agile</option>
              <option value="AWS">AWS</option>
              <option value="Azure">Azure</option>
              <option value="C">C</option>
              <option value="C#">C#</option>
              <option value="C++">C++</option>
              <option value="Git">Git</option>
              <option value="HTML/CSS">HTML/CSS</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
              <option value="React">React</option>
              <option value="Scrum">Scrum</option>
              <option value="SQL">SQL</option>
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hashtags*</Form.Label>
            <br></br>
            <select
              data-cy="addmodal-hashtags"
              multiple
              required
              onChange={handleTagsChange}
              data-testid="add_modal_hashtags"
            >
              <option value="#ML/AI">#ML/AI</option>
              <option value="#WebDevelopment">#WebDevelopment</option>
              <option value="#Hardware">#Hardware</option>
            </select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="add-modal-footer">
        {showToast ? (
          <Alert data-cy="alert-toast" data-testid="add_modal_invalid_toast">
            Your form is <b>incomplete</b>. Please fill out all required (*)
            fields.
          </Alert>
        ) : (
          <div></div>
        )}
        {ShowNegToast ? (
          <Alert data-testid="add_modal_invalid_toast_negative">
            Your cannot enter a <b>negative</b> wage or number of people. Please
            enter a value of 0 or greater.
          </Alert>
        ) : (
          <div></div>
        )}
        <Button
          data-testid="add_modal_submit_button"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          data-cy="submitButton"
        >
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
