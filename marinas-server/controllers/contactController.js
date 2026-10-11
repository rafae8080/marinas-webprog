const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Message = require("../models/Message");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value) => (typeof value === "string" ? value.trim() : "");

// Returns { data, errors } with trimmed fields and per-field error messages
const validate = (input) => {
  const data = {
    name: clean(input.name),
    email: clean(input.email).toLowerCase(),
    subject: clean(input.subject),
    body: clean(input.body),
  };
  const errors = {};
  if (!data.name) errors.name = "Name is required.";
  else if (data.name.length > 80) errors.name = "Name must be 80 characters or fewer.";
  if (!data.email) errors.email = "Email is required.";
  else if (data.email.length > 254 || !EMAIL_RE.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.subject.length > 120) errors.subject = "Subject must be 120 characters or fewer.";
  if (data.body.length < 10) errors.body = "Message must be at least 10 characters.";
  else if (data.body.length > 4000) errors.body = "Message must be 4000 characters or fewer.";
  return { data, errors };
};

// Optional Gmail notification. Only runs when MAIL_USER, MAIL_APP_PASSWORD and MAIL_TO are set.
const mailConfigured = () =>
  Boolean(process.env.MAIL_USER && process.env.MAIL_APP_PASSWORD && process.env.MAIL_TO);

let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_APP_PASSWORD.replace(/\s/g, "") },
      connectionTimeout: 10000,
      socketTimeout: 10000,
    });
  }
  return transporter;
};

const notify = async (message) => {
  if (!mailConfigured()) return;
  try {
    await getTransporter().sendMail({
      from: `"Portfolio contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: `"${message.name.replace(/"/g, "")}" <${message.email}>`,
      subject: `[Portfolio] ${message.subject || `Message from ${message.name}`}`,
      text: `From: ${message.name} <${message.email}>\nSubject: ${message.subject || "(none)"}\n\n${message.body}`,
    });
  } catch (error) {
    // Mail failure must not fail the request: the message is already saved
    console.error("Contact notification failed:", error.message);
  }
};

// POST /api/contact (public, rate-limited)
const createMessage = async (req, res) => {
  const input = req.body || {};

  // Honeypot: real visitors never see or fill the "company" field
  if (clean(input.company)) {
    return res.status(200).json({ message: "Message received" });
  }

  const { data, errors } = validate(input);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "Please fix the highlighted fields.", errors });
  }

  try {
    const message = await Message.create(data);
    await notify(message);
    res.status(201).json({ message: "Message received", id: message._id });
  } catch (error) {
    console.error("Contact save failed:", error.message);
    res.status(500).json({ message: "Could not save your message. Please email me directly." });
  }
};

// GET /api/contact (admin): newest first
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/contact/:id (admin): set or toggle `read`
const updateMessage = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Message not found" });
  }
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    message.read = typeof req.body?.read === "boolean" ? req.body.read : !message.read;
    await message.save();
    res.json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/contact/:id (admin)
const deleteMessage = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Message not found" });
  }
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createMessage, getMessages, updateMessage, deleteMessage };
