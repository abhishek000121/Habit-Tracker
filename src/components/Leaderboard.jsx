
import React from "react";
import { Table, Card } from "react-bootstrap";
import { getBoard } from "../utils/leaderboard";
import { getUsers } from "../utils/auth";

const Leaderboard = () => {
  const board = getBoard();
  const users = getUsers();
  const rows = Object.entries(board)
    .map(([email, score]) => {
      const user = users.find(u => u.email === email);
      return { name: user?.name || email.split("@")[0], email, score };
    })
    .sort((a,b)=>b.score - a.score);

  return (
    <div className="container mt-4">
      <Card className="p-3 shadow-sm">
        <h4 className="mb-3">Leaderboard</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={4} className="text-center">No scores yet. Mark habits as Done to earn points!</td></tr>
            )}
            {rows.map((r, i) => (
              <tr key={r.email}>
                <td>{i+1}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Leaderboard;
