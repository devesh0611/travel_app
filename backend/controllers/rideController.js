const Ride = require("../models/Rides");
const TravelPlan = require("../models/TravelPlans")

// @desc    Create a new ride
// @route   POST /api/rides
// @access  Private
const createRide = async (req, res) => {
  try {

    const { vehicleDetails, availableSeats, totalSeats, costPerSeat, dateTime } = req.body;

    const { travelPlanId } = req.params
    const travelPlan = await TravelPlan.findById(travelPlanId);

    if (!travelPlan) {
      return res.status(404).json({ msg: "Travel plan not found" });
    }

    // ensure travel plan doesn’t already have a ride
    if (travelPlan.ride) {
      return res.status(400).json({ msg: "Ride already exists for this travel plan" });
    }
    
    if (!vehicleDetails || !availableSeats || !totalSeats || !dateTime) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const ride = new Ride({
      travelPlans : [travelPlanId],
      vehicleDetails,
      availableSeats,
      totalSeats,
      costPerSeat,
      createdBy: req.user.id,   // assuming auth middleware sets req.user
      participants: [req.user.id],
      dateTime
    });

    const savedRide = await ride.save();

    // link back in TravelPlan
    travelPlan.isVehicleBooked = true;
    travelPlan.ride = ride.id;
    await travelPlan.save();

    res.status(201).json(savedRide);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all rides
// @route   GET /api/rides
// @access  Public
const getRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate("createdBy", "name email");
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single ride
// @route   GET /api/rides/:id
// @access  Public
const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate("participants", "name email");
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/rideController.js
const joinRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { travelPlanId } = req.body;

    // Find the travelPlan
    const plan = await TravelPlan.findById(travelPlanId).populate("ride");
    if (!plan) return res.status(404).json({ message: "Travel Plan not found" });

    // Get the ride linked to this plan
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    // Check if already joined
    if (ride.passengers.includes(req.user.id)) {
      return res.status(400).json({ message: "Already joined this ride" });
    }

    // Check available seats
    if (ride.seatsAvailable <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    // Add passenger
    ride.passengers.push(req.user.id);
    ride.travelPlans.push(travelPlanId);
    ride.seatsAvailable -= 1;
    await ride.save();

    // make changes to travelPlan
    plan.isVehicleBooked = true;
    plan.ride = ride;

    res.json({ message: "Successfully joined ride", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createRide,
  getRides,
  getRideById,
  joinRide
};
