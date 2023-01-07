import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Card.css";

export default function CardApp(props) {
    return (
        <Card className="job-card">
            <Card.Header>{props.applicationData.projectName}</Card.Header>
            <Card.Body>
            <Card.Title>{props.applicationData.positionName}</Card.Title>
            <Card.Text>
                {props.applicationData.description}
            </Card.Text>
            <ul className="hashtags">
                {props.applicationData.tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                ))}
            </ul>
            <Button variant="primary">See more</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{props.applicationData.datePosted}</Card.Footer>
        </Card>
    );
}