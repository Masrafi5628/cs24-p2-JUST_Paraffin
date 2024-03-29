const mongoose = require('mongoose');

const vehicleDetailsSchema = new mongoose.Schema({

    registrationNumber: {
        type: String
    },
    type: {
        type: String
    },
    capacity: {
        type: Number
    },
    fuelCostLoaded: {
        type: Number
    },
    fuelCostUnloaded: {
        type: Number
    },
},
    {
        collection: 'vehiclesInfo'
    }
);

mongoose.model('vehiclesInfo', vehicleDetailsSchema);