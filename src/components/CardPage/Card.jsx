import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ViewModal from "../ViewModal/ViewModal";
import "./Card.css";

export default function CardApp({ data }) {
  const [showViewModal, setShowViewModal] = useState(false);
  const toggleShowViewModal = () => setShowViewModal(!showViewModal);

  const hashtags = Object.values(data.hashtags).map((hashtag, i) => {
    return <li key={i}>{hashtag}</li>;
  });

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <Card className="job-card">
        <Card.Header>{data.projectName}</Card.Header>
        <Card.Body>
          <Card.Title>{data.positionName}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <ul className="hashtags">{hashtags}</ul>
          <Button onClick={toggleShowViewModal} variant="primary">
            See more
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Date posted: {data.datePosted}
        </Card.Footer>
      </Card>
      <ViewModal applicationData={data} show={showViewModal} toggleShow={toggleShowViewModal} />
    </>
  );
}
