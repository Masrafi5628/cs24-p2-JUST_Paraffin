const mongoose = require('mongoose');

const FleetTruckDetailsSchema = new mongoose.Schema({
    registrationNumber: {
        type: String
    },
    capacity: {
        type: Number
    },
    Ratio: {
        type: Number
    },
    volumeOfWaste: {
        type: Number
    },


},
    {
        collection: 'fleeTruckInfo'
    });

mongoose.model('fleeTruckInfo', FleetTruckDetailsSchema);
