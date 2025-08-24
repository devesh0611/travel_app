const mongoose = require('mongoose')

const travelPlanSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    source : {type : String, required : true},
    destination : {type : String, required : true},
    dateTime : {type : Date, required : true},
    ride : {type :mongoose.Schema.Types.ObjectId, ref : "Ride"},
}, { timestamps: true })

module.exports = mongoose.model("TravelPlan", travelPlanSchema);