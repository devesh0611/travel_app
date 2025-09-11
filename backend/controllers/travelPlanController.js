const TravelPlan = require('../models/TravelPlans')
const Ride = require('../models/Rides')

const createTravelPlan = async (req, res) => {
    try {
        const {source, destination, dateTime, rideDetails } = req.body;

        if(!source || !destination || !dateTime)
            res.status(400).json({message : "All fields are required"})

        const userId = req.user.id
        let ride = null;

        const travelPlan = new TravelPlan ({
            user : req.user.id,
            source,
            destination,
            dateTime,
            ride : ride
        });
        await travelPlan.save();

        if(rideDetails) {
            ride = await Ride.create({
                travelPlans : [travelPlan.id],
                vehicleDetails: rideDetails.vehicleDetails,
                availableSeats: rideDetails.availableSeats,
                totalSeats: rideDetails.totalSeats,
                costPerSeat: rideDetails.costPerSeat || 0,
                participants: [userId],
                createdBy: userId,
            })
        }
        travelPlan.ride = ride;
        await travelPlan.save();
        res.status(201).json(travelPlan);
    }
    catch(err) {
        res.status(500).json({message : "Server Error"});
    }
}

const getTravelPlans = async (req, res) => {
    try {
        const plans = await TravelPlan.find({ user: req.user.id }).populate("user", "name email").populate("ride");
        res.status(200).json(plans);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}


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

const editTravelPlan = async (req, res) => {
    try {
        const travelPlanId = req.params.id
        const travelPlan = await TravelPlan.findById(travelPlanId)
        const {source, destination, dateTime, rideDetails } = req.body;

        if(!source || !destination || !dateTime)
            res.status(400).json({message : "All fields are required"})

        const userId = req.user.id
        let ride = null;

        travelPlan.source = source
        travelPlan.destination = destination
        travelPlan.dateTime = dateTime
    

        if(rideDetails) {
            ride = await Ride.create({
                travelPlans : [travelPlan.id],
                vehicleDetails: rideDetails.vehicleDetails,
                availableSeats: rideDetails.availableSeats,
                totalSeats: rideDetails.totalSeats,
                costPerSeat: rideDetails.costPerSeat || 0,
                participants: [userId],
                createdBy: userId,
            })
        }
        travelPlan.ride = ride;
        await travelPlan.save()
        res.status(201).json(travelPlan);
    }
    catch(err) {
        res.status(500).json({message : "Server Error"});
    }
}

const joinRide = async (req, res) => {
    try {
        const travelPlanId = req.params.id;
        const travelPlanIdWithRide = req.params.join_id;
        const travelPlanWithRide = await TravelPlan.findById(travelPlanIdWithRide).populate("ride")

        if(!travelPlanWithRide.ride) {
            return res.status(400).json({message : "Ride is not booked."});
        }

        const ride = travelPlanWithRide.ride;
        if(ride.availableSeats<=0)
            return res.status(400).json({message : "Seats are full"});
        ride.travelPlans.push(travelPlanId)
        ride.participants.push(req.user.id)
        ride.availableSeats = ride.availableSeats - 1;

        await ride.save()

        const travelPlan = await TravelPlan.findById(travelPlanId)
        travelPlan.ride = ride;
        await travelPlan.save()

        

        return res.status(200).json({message : "Successfully joined the ride"})
    }
    catch(error) {
        res.status(500).json({message : "Server Error"})
    }
    
}

const deleteTravelPlan = async (req, res) => {
  try {
    const travelPlanId = req.params.id;
    const userId = req.user.id;

    const travelPlan = await TravelPlan.findById(travelPlanId).populate("ride");
    if (!travelPlan) {
      return res.status(404).json({ message: "TravelPlan not found" });
    }

    // Case 1: TravelPlan has no ride
    if (!travelPlan.ride) {
      await TravelPlan.findByIdAndDelete(travelPlanId);
      return res.status(200).json({ message: "TravelPlan deleted successfully" });
    }

    const ride = await Ride.findById(travelPlan.ride.id).populate("travelPlans");

    // Case 2: User is the creator of the ride
    if (ride.createdBy.toString() === userId.toString()) {
      // Set ride=null for all travelPlans linked to this ride
      for (let tp of ride.travelPlans) {
        tp.ride = null;
        await tp.save();
      }
      // Delete ride
      await Ride.findByIdAndDelete(ride.id);
      // Delete current travelPlan
      await TravelPlan.findByIdAndDelete(travelPlanId);

      return res.status(200).json({ message: "TravelPlan and associated ride deleted successfully" });
    }

    // Case 3: User is not the creator, just a participant
    ride.travelPlans = ride.travelPlans.filter(
      (tp) => tp.id.toString() !== travelPlanId.toString()
    );
    ride.participants = ride.participants.filter(
      (p) => p.toString() !== userId.toString()
    );
    ride.availableSeats = ride.availableSeats + 1;
    await ride.save();

    await TravelPlan.findByIdAndDelete(travelPlanId);

    return res.status(200).json({ message: "TravelPlan deleted and removed from ride" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createTravelPlan, getTravelPlans, getTravelPlanById, editTravelPlan, searchSimilarTravelPlans, editTravelPlan, joinRide, deleteTravelPlan }
