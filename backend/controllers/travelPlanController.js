const TravelPlan = require('../models/TravelPlans')
const Ride = require('../models/Rides')

const createTravelPlan = async (req, res) => {
    try {
        const {source, destination, dateTime, isVehicleBooked, rideDetails } = req.body;

        if(!source || !destination || !dateTime)
            res.status(400).json({message : "All fields are required"})

        const userId = req.user.id
        let ride = null;

        if(isVehicleBooked && rideDetails) {
            ride = await Ride.create({
                vehicleDetails: rideDetails.vehicleDetails,
                availableSeats: rideDetails.availableSeats,
                totalSeats: rideDetails.totalSeats,
                costPerSeat: rideDetails.costPerSeat || 0,
                participants: [userId],
                createdBy: userId,
                dateTime: dateTime,
            })
        }
        
        const travelPlan = new TravelPlan ({
            user : req.user.id,
            source,
            destination,
            dateTime,
            isVehicleBooked,
            ride : ride ? ride._id : null
        });
        await travelPlan.save();
        res.status(201).json(travelPlan);
    }
    catch(err) {
        res.status(500).json({message : "Server Error"});
    }
}

const getTravelPlans = async (req, res) => {
    try {
        const plans = await TravelPlan.find({ user: req.user.id });
        res.status(200).json(plans);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}

// @desc    Get a single ride
// @route   GET /api/rides/:id
// @access  Public
const getTravelPlanById = async (req, res) => {
  try {
    const plan = await TravelPlan.findById(req.params.id).populate("user", "name email").populate("ride");
    if (!plan) return res.status(404).json({ message: "Travel Plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchSimilarTravelPlans = async (req, res) => {
    try {
        const travelPlan = await TravelPlan.findById(req.params.id)
        if(!travelPlan) {
            return res.status(400).json({message : "Travel Plan not found!"})
        }

        const planDate = new Date(travelPlan.dateTime)

        // startTime and endTime : range of 6 hours before and 6 hours after
        const startTime = new Date(planDate.getTime()-6*60*60*1000)
        const endTime = new Date(planDate.getTime()+6*60*60*1000)

        //find Similar Plans
        const similarPlans = await TravelPlan.find({
            _id : {$ne : travelPlan.id}, // exclude current plan
            source : travelPlan.source,
            destination : travelPlan.destination,
            dateTime : {$gte : startTime, $lte : endTime}
        })
        .populate("user", "name email")
        .populate("ride");

        res.json(similarPlans)
    }
    catch(error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = { createTravelPlan, getTravelPlans, getTravelPlanById, searchSimilarTravelPlans }
