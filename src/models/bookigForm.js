const mongoose = require("mongoose");



const bookingFormSchema = new mongoose.Schema({
    fname : {
                type: String,
                required : true,
            },

    lname : {
                type: String,
                required : true,
            },
    email : {
                type: String,
                required : true,
                unique:[true,"Email id already present"]
            },

    Locality : {
                type: String,
                required : true
    },
    address : {
        type: String
    },
    State : {
        type: String,
        required : true
    },
    Zip : {
        type: Number,
        required : true
    },
    dob : {
        type: Date,
        required : true
    },
    phone : {
        type: Number,
        required : true
    },
});


const Userbooking = mongoose.model("Userbooking",bookingFormSchema);

module.exports = Userbooking;