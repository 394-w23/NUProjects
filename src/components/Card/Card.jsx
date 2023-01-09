import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Card.css";

export default function CardApp({data}) {
    const hashtags = Object.values(data.hashtags).map((hashtag, i) => {
         return ( 
         <li key={i}>{hashtag}</li>
     )})
    return (
        <Card className="job-card">
            <Card.Header>{data.projectName}</Card.Header>
            <Card.Body>
            <Card.Title>{data.positionName}</Card.Title>
            <Card.Text>
                {data.description}
            </Card.Text>
            <ul className="hashtags">{hashtags}</ul>
            <Button variant="primary">See more</Button>
            </Card.Body>
            <Card.Footer className="text-muted">Date posted: {data.datePosted}</Card.Footer>
        </Card>
    );
}