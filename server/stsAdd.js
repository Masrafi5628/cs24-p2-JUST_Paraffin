const mongoose = require('mongoose');

const stsDetailsSchema = new mongoose.Schema({

    wardNumber: {
        type: String
    },
    capacity: {
        type: String
    },

    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
},
    {
        collection: 'stsInfo'
    }
);

mongoose.model('stsInfo', stsDetailsSchema);