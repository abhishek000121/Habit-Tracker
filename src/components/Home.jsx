import React from "react";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";

const Home = () => {
  const suggestions = [
    "Read 1 page",
    "Meditate 5 min",
    "Running",
    "Jogging",
    "Exercise",
    "Wake up Early",
    "Go to bed by 11",
    "Walk the dog",
    "Cleaning",
    "Swimming",
    "Write Diary",
  ];

  return (
    <Row>
      {/* Left Section */}
      <Col md={8}>
        <Card className="mb-3">
          <Card.Body className="bg-primary text-white">
            <strong>Quote of the day:</strong> Stay consistent, not perfect.  
            <span className="float-end">by: Unknown</span>
          </Card.Body>
        </Card>
        <Button variant="primary">Add Habit</Button>
      </Col>

      {/* Right Section */}
      <Col md={4}>
        <Card>
          <Card.Header className="text-center">Suggestions</Card.Header>
          <ListGroup variant="flush">
            {suggestions.map((s, i) => (
              <ListGroup.Item key={i} className="bg-light">
                {s} <span className="float-end">📌</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
