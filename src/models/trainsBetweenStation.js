const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    trainName : {
                type: String,
                required : true,
                unique:true
            },
    trainNo : {
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

    arrival : {
        type: String,
        required : true
    },

    departure : {
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


const TrainBetweenStation = mongoose.model("TrainBetweenStation",userSchema);

module.exports = TrainBetweenStation;