
// Simple localStorage-based auth (demo only)
export function getUsers() {
  try { return JSON.parse(localStorage.getItem("users") || "[]"); } catch { return []; }
}
export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
export function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem("currentUser") || "null"); } catch { return null; }
}
export function setCurrentUser(user) {
  if (user) localStorage.setItem("currentUser", JSON.stringify(user));
  else localStorage.removeItem("currentUser");
}
export function signUp({ name, email, password }) {
  const users = getUsers();
  if (users.some(u => u.email === email)) throw new Error("Email already registered");
  const user = { id: Date.now(), name, email, password };
  users.push(user);
  saveUsers(users);
  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  return user;
}
export function signIn({ email, password }) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password");
  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  return user;
}
