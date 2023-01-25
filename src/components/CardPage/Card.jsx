import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import ViewModal from "../ViewModal/ViewModal";
import "./Card.css";

export default function CardApp({ data }) {
  const [showViewModal, setShowViewModal] = useState(false);
  const toggleShowViewModal = () => setShowViewModal(!showViewModal);

  const hashtags = Object.values(data.hashtags).map((hashtag, i) => {
    return <li key={i}>{hashtag}</li>;
  });

  return (
    <>
      <Card className="job-card">
        <Card.Header>
          <b>{data.projectName}</b> | {data.numberOfPeople} members
        </Card.Header>
        <Card.Body>
          <Card.Title>{data.positionName}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <ul className="hashtags">{hashtags}</ul>
          <Button onClick={toggleShowViewModal} variant="primary">
            See more
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Date posted: {data.datePosted} | Deadline: {data.dateToSubmit}
        </Card.Footer>
      </Card>
      <ViewModal
        applicationData={data}
        show={showViewModal}
        toggleShow={toggleShowViewModal}
      />
    </>
  );
}
