const mongoose = require('mongoose');

const landfillDetailsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    capacity: {
        type: Number
    },
    operationalTimespan: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    latitudeRad: {
        type: Number
    },
    longitudeRad: {
        type: Number
    },
    managers: {
        type: [String],
        default: []
    }
},
    {
        collection: 'landfillSitesInfo'
    });

mongoose.model('landfillSitesInfo', landfillDetailsSchema);
