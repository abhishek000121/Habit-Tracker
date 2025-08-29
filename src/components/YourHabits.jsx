import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const YourHabits = () => {
  const [habits, setHabits] = useState([
    { name: "Running", progress: Array(7).fill("pending") },
  ]);
  const [habitList, setHabitList] = useState([...habits]);
  const [openHabits, setOpenHabits] = useState([false]); // track which habit's progress is open
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState({ title: "", description: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [progressNotification, setProgressNotification] = useState({ show: false, message: "" });

  const days = [
    "Thu , Aug 14 2025",
    "Fri , Aug 15 2025",
    "Sat , Aug 16 2025",
    "Sun , Aug 17 2025",
    "Mon , Aug 18 2025",
    "Tue , Aug 19 2025",
    "Wed , Aug 20 2025",
  ];

  const gradientStyle = { background: "linear-gradient(45deg, teal, blue)", border: "none", color: "white" };

  const handleAddHabit = () => {
    if (!newHabit.title.trim()) return;
    const newHabitData = { name: newHabit.title, progress: Array(7).fill("pending") };
    setHabitList([...habitList, newHabitData]);
    setHabits([...habits, newHabitData]);
    setOpenHabits([...openHabits, false]); // new habit closed by default
    setNewHabit({ title: "", description: "" });
    setShowModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleRemoveHabit = (index) => {
    setHabitList(habitList.filter((_, i) => i !== index));
    setHabits(habits.filter((_, i) => i !== index));
    setOpenHabits(openHabits.filter((_, i) => i !== index));
  };

  const toggleHabitProgress = (index) => {
    const updatedOpenHabits = [...openHabits];
    updatedOpenHabits[index] = !updatedOpenHabits[index];
    setOpenHabits(updatedOpenHabits);
  };

  const markProgress = (habitIndex, dayIndex, status) => {
    const updated = [...habits];
    updated[habitIndex].progress[dayIndex] = status;
    setHabits(updated);

    if (status === "done") {
      try {
        const cu = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (cu?.email) {
          const raw = localStorage.getItem("leaderboard") || "{}";
          const board = JSON.parse(raw);
          board[cu.email] = (board[cu.email] || 0) + 1;
          localStorage.setItem("leaderboard", JSON.stringify(board));
        }
      } catch {}
      setProgressNotification({ show: true, message: "✅ Done!" });
    } else if (status === "missed") {
      setProgressNotification({ show: true, message: "❌ Skipped!" });
    } else {
      return;
    }

    setTimeout(() => setProgressNotification({ show: false, message: "" }), 1500);
  };

  return (
    <div className="container mt-4" style={{ background: "#e0f7f7", minHeight: "100vh", paddingBottom: "50px" }}>
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <h5 className="p-2 rounded text-white" style={gradientStyle}>Hey Champ,</h5>
            </Col>
            <Col className="text-end">
              <h6>{days[6]}</h6>
            </Col>
          </Row>

          <h5>Your Habit List</h5>
          {habitList.map((habit, i) => (
            <div key={i}>
              <Card
                className="mb-2 p-2"
                style={{ background: "#f0f8f8", cursor: "pointer" }}
                onClick={() => toggleHabitProgress(i)}
              >
                <Row>
                  <Col><strong>{habit.name}</strong></Col>
                  <Col className="text-end">
                    <Button
                      style={gradientStyle}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveHabit(i);
                      }}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
                {i < habits.length && <p>{habit.progress.filter(p => p === "done").length}/7 Days</p>}
              </Card>

              {openHabits[i] && (
                <div className="mb-3" style={{ paddingLeft: "10px" }}>
                  <h6>Your Weekly Progress:</h6>
                  <Row>
                    {days.map((day, dayIndex) => (
                      <Col md={3} key={dayIndex} className="mb-2">
                        <Card className="p-2 text-center" style={{ background: "#f0f8f8" }}>
                          <small>{day}</small>
                          <div className="mt-2">
                            <div className="mb-1 d-flex justify-content-center align-items-center">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`habit-${i}-day-${dayIndex}`}
                                  checked={habits[i].progress[dayIndex] === "done"}
                                  onChange={() => markProgress(i, dayIndex, "done")}
                                />
                                <label className="form-check-label">✔</label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`habit-${i}-day-${dayIndex}`}
                                  checked={habits[i].progress[dayIndex] === "missed"}
                                  onChange={() => markProgress(i, dayIndex, "missed")}
                                />
                                <label className="form-check-label">✖</label>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          ))}

          <Button style={{ ...gradientStyle, marginTop: "10px" }} onClick={() => setShowModal(true)}>New Habit</Button>
        </Card.Body>
      </Card>

      {showModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)" }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-body">
                <form>
                  <div>
                    <label className="form-label" htmlFor="title">Habit Title</label>
                    <input
                      placeholder="Enter title"
                      required
                      type="text"
                      id="title"
                      className="form-control"
                      value={newHabit.title}
                      onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="form-label" htmlFor="description">Describe it</label>
                    <input
                      placeholder="Short description"
                      type="text"
                      id="description"
                      className="form-control"
                      value={newHabit.description}
                      onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    <button type="button" className="btn" style={gradientStyle} onClick={handleAddHabit}>Add Habit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNotification && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
          <div style={{ background: "white", padding: "20px 40px", borderRadius: "10px", boxShadow: "0px 4px 20px rgba(0,0,0,0.3)", fontSize: "18px", fontWeight: "bold", color: "teal", textAlign: "center" }}>
            ✅ Habit added successfully!
          </div>
        </div>
      )}

      {progressNotification.show && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
          <div style={{ background: "white", padding: "20px 40px", borderRadius: "10px", boxShadow: "0px 4px 20px rgba(0,0,0,0.3)", fontSize: "18px", fontWeight: "bold", color: "teal", textAlign: "center" }}>
            {progressNotification.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default YourHabits;
