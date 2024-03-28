const mongoose = require('mongoose');

const vehicleDetailsSchema = new mongoose.Schema({

    registrationNumber: {
        type: String, unique: true
    },
    type: {
        type: String, unique: true
    },
    capacity: {
        type: String, unique: true
    },
    fuelCostLoaded: {
        type: Number,
        unique: true
    },
    fuelCostUnloaded: {
        type: Number,
        required: true
    },
},
    {
        collection: 'vehiclesInfo'
    }
);

mongoose.model('vehiclesInfo', vehicleDetailsSchema);