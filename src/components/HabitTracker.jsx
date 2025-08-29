import React, { useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";

const HabitTracker = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  

  const suggestions = [
    "Wake up early",
    "Drink 2L water",
    "Meditate 10 min",
    "Read 10 pages",
    "Exercise 30 min",
    "Write a journal",
    "Take a walk",
    "Eat a healthy breakfast",
    "Plan your day",
    "Practice gratitude",
    "Avoid junk food",
    "Do 10 pushups",
    "Stretch for 5 min",
    "Limit screen time",
    "Go to bed early"
  ];

  const handleAddHabit = () => {
    if (!title.trim()) return;

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);

    setTitle("");
    setDescription("");
    setShowModal(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(135deg, #1abc9c, #3498db)", // Matches navbar gradient
      }}
    >
      <Row className="mb-4">
        <Col md={12}>
          {/* Quote Card */}
          <Card style={{ borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)" }}>
            <Card.Body style={{ background: "#16a085", color: "white", borderRadius: "10px" }}>
              <strong>Quote of the day:</strong> Stay consistent, not perfect.
              <span className="float-end">by: Unknown</span>
            </Card.Body>
          </Card>

          {/* Add Habit Button */}
          <Button
            style={{
              background: "#f1c40f", // bright accent color
              border: "none",
              color: "white",
              fontWeight: "bold",
              marginTop: "15px",
              borderRadius: "25px",
              padding: "12px 25px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
            }}
            onClick={() => setShowModal(true)}
          >
            Add Habit
          </Button>
        </Col>
      </Row>

      {/* Daily Habit Suggestions */}
      <Row>
        {suggestions.map((habit, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-3">
            <Card
              style={{
                background: "rgba(255,255,255,0.9)",
                padding: "15px",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                textAlign: "center",
                fontWeight: "500",
                color: "#34495e",
              }}
            >
              {habit} 📌
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal with framed form */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <Card style={{ width: "350px", padding: "20px", borderRadius: "15px", boxShadow: "0px 6px 20px rgba(0,0,0,0.25)" }}>
            <h5 className="mb-3 text-center">Add New Habit</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Habit Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Describe it</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Short description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <div className="text-end">
                <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button
                  style={{
                    background: "linear-gradient(45deg, #1abc9c, #3498db)",
                    border: "none",
                    fontWeight: "bold",
                  }}
                  onClick={handleAddHabit}
                >
                  Add Habit
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      )}

      {/* Centered Notification with Blur */}
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px 40px",
              borderRadius: "10px",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1abc9c",
              textAlign: "center",
            }}
          >
            ✅ Habit added successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
