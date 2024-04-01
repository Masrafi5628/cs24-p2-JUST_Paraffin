const mongoose = require('mongoose');

const stsVehcilekDetailsSchema = new mongoose.Schema({

    stsId: {
        type: Number,
        required: true,
        unique: true
    },
    vehicleNumber: {
        type: Number,
        required: true,
        unique: true
    },
    weightofWaste: {
        type: Number,
        required: true
    },
    timeofArrival: {
        type: String,
        required: true
    },
    timeofDeparture: {
        type: String,
        required: true
    },
},
    {
        collection: 'stsvehcileInfo'
    }
);

mongoose.model('stsvehcileInfo', stsVehcilekDetailsSchema);