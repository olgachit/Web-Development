const Event = require("../models/eventModel");
const mongoose = require("mongoose");

//GET / events;
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// POST /events
const createEvent = async (req, res) => {
  try {
    const { title, date, location, organizer } = req.body;
    const event = await Event.create({ title, date, location, organizer });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: "Failed to create event" });
  }
};

// GET /events/:eventId
const getEventById = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

// PUT /events/:eventId
const updateEvent = async (req, res) => {
  res.send("updateEvent");
};

// DELETE /events/:eventId
const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findOneAndDelete({ _id: eventId });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
