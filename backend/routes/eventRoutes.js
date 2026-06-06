const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { body, validationResult } = require("express-validator");

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

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
});

// CREATE event
router.post(
  "/",
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required"),

    body("description")
      .notEmpty()
      .withMessage("Description is required")
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      const event = new Event({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        image: req.body.image,
        date: req.body.date
      });

      const newEvent = await event.save();

      res.status(201).json(newEvent);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

// UPDATE event
router.put("/:id", async (req, res) => {

  try {

    const updatedEvent =
      await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!updatedEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(updatedEvent);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// DELETE event
router.delete("/:id", async (req, res) => {

  try {

    const deletedEvent =
      await Event.findByIdAndDelete(
        req.params.id
      );

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;