import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Card.css";

export default function CardApp(props) {
    // console.log(props)
    // console.log(props.hashtags)
    // console.log(typeof(props.hashtags))
    
    // const hashtags = Object.values(props.hashtags).map((hashtag, i) => {
    //     return ( 
    //     <li key={i}>{hashtag}</li>
    // )})
    return (
        <Card className="job-card">
            <Card.Header>{props.projectName}</Card.Header>
            <Card.Body>
            <Card.Title>{props.positionName}</Card.Title>
            <Card.Text>
                {props.description}
            </Card.Text>
            <ul className="hashtags"><li>{props.hashtags}</li></ul>
            <Button variant="primary">See more</Button>
            </Card.Body>
            <Card.Footer className="text-muted">Date posted: {props.datePosted}</Card.Footer>
        </Card>
    );
}