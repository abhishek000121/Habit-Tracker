
// Very lightweight leaderboard: +1 point per 'done' mark
export function addPoints(userEmail, points = 1) {
  if (!userEmail) return;
  const raw = localStorage.getItem("leaderboard") || "{}";
  const board = JSON.parse(raw);
  board[userEmail] = (board[userEmail] || 0) + points;
  localStorage.setItem("leaderboard", JSON.stringify(board));
}
export function getBoard() {
  try { return JSON.parse(localStorage.getItem("leaderboard") || "{}"); } catch { return {}; }
}
