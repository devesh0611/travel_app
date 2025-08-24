const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    hall : {type : String, enum : ['SHR', 'MHR', 'GHR', 'BHR', 'RHR', 'Sangam'], required : true},
    gender : {type : String, enum : ['Male', 'Female', 'Other'], required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})

module.exports = mongoose.model('User', userSchema)