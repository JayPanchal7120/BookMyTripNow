const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    flightName : {
                type: String,
                required : true,
                unique:true
            },
    flightNo : {
        type: Number,
        // min=5,
        // max=5,
        required : true
    },
    from : {
                type: String,
                required : true
            },
    to : {
        type: String,
        required : true
    },

    takeoff : {
        type: String,
        required : true
    },

    landing : {
        type: String,
        required : true
    },
    duration : {
        type: String,
        required : true
    },
    distance : {
        type: Number,
        required : true
    },
    classname:[String],
    day:[Number]
});


const FlightBetweenAirport = mongoose.model("FlightBetweenAirport",userSchema);

module.exports = FlightBetweenAirport;