const express = require("express");
const { createRide, getRides, getRideById, joinRide } = require("../controllers/rideController");
const auth  = require("../middleware/auth"); // auth middleware

const router = express.Router();

router.post("/:id/", auth, createRide);      // create a ride
router.get("/", getRides);                  // get all rides
router.get("/:id", getRideById);            // get one ride
router.post("/:id/join", auth, joinRide); // join a ride

module.exports = router;
