import api from "../lib/api";

// Public contact form
export const sendMessage = (data) => api.post("/contact", data);
