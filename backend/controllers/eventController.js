const Event = require("../models/Event");
const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} =
require("../controllers/eventController");

// GET ALL EVENTS
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET SINGLE EVENT
const getEventById = async (req, res) => {
  try {
    const event =
      await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(event);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE EVENT
const createEvent = async (req, res) => {
  try {

    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      image: req.body.image,
      date: req.body.date
    });

    const newEvent =
      await event.save();

    res.status(201).json(newEvent);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// UPDATE EVENT
const updateEvent = async (req, res) => {
  try {

    const updatedEvent =
      await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedEvent);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// DELETE EVENT
const deleteEvent = async (req, res) => {
  try {

    await Event.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Event deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};