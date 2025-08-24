const mongoose = require("mongoose")

const rideSchema = mongoose.Schema({
    travelPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelPlan", required: true }],
    vehicleDetails : {type : String, required : true},
    availableSeats : {type : Number, required : true},
    totalSeats : {type : Number, required : true},
    costPerSeat : {type : Number, default : 0},
    participants : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
}, { timestamps: true })

module.exports = mongoose.model("Ride", rideSchema);