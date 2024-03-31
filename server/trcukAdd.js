const mongoose = require('mongoose');

const truckDetailsSchema = new mongoose.Schema({

    weightofWaste: {
        type: Number
    },
    timeofArrival: {
        type: String
    },
    timeofDeparture: {
        type: String
    },
    truckNumber: {
        type: String
    }
},
    {
        collection: 'trucksInfo'
    }
);

mongoose.model('trucksInfo', truckDetailsSchema);