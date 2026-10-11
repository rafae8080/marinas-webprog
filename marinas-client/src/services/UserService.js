import api from "../lib/api";

// API Access to Front-end JSON data transformation or decoder

// Fetch users
export const fetchUsers = () => api.get("/users");

// Create user
export const createUser = (user) => api.post("/users", user);

// Update user
export const updateUser = (id, user) => api.put(`/users/${id}`, user);

// Delete user
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Login user
export const loginUser = (credentials) => api.post("/users/login", credentials);
