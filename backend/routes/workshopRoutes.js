const express = require("express");
const router = express.Router();
const Workshop = require("../models/Workshops");
const { body, validationResult } = require("express-validator");

// GET all workshops
router.get("/", async (req, res) => {

  try {

    const workshops =
      await Workshop.find();

    res.json(workshops);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// GET single workshop
router.get("/:id", async (req, res) => {

  try {

    const workshop =
      await Workshop.findById(req.params.id);

    if (!workshop) {
      return res.status(404).json({
        message: "Workshop not found"
      });
    }

    res.json(workshop);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// CREATE workshop
router.post(
  "/",
  [
    body("title")
      .notEmpty()
      .withMessage("Workshop title is required")
  ],
  async (req, res) => {

    const errors =
      validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      const workshop =
        new Workshop({
          title: req.body.title,
          description: req.body.description,
          instructor: req.body.instructor,
          date: req.body.date,
          image: req.body.image
        });

      const newWorkshop =
        await workshop.save();

      res.status(201).json(newWorkshop);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

// UPDATE workshop
router.put("/:id", async (req, res) => {

  try {

    const updatedWorkshop =
      await Workshop.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!updatedWorkshop) {
      return res.status(404).json({
        message: "Workshop not found"
      });
    }

    res.json(updatedWorkshop);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// DELETE workshop
router.delete("/:id", async (req, res) => {

  try {

    const deletedWorkshop =
      await Workshop.findByIdAndDelete(
        req.params.id
      );

    if (!deletedWorkshop) {
      return res.status(404).json({
        message: "Workshop not found"
      });
    }

    res.json({
      message: "Workshop deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;