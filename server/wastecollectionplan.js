const mongoose = require('mongoose');

//add schema for worker
const wastecollectionschema = new mongoose.Schema({
    areaofcollection: {
        type: String,
    },
    collectionstarttime: {
        type: Date,
    },
    durationofcollection: {
        type: String,
    },
    numberoflaborers: {
        type: Number,
    },
    numberofvans: {
        type: Number,
    },
    expectedwaste: {
        type: Number,
    }
},
    {
        collection: 'wastecollectioninfo'
    });

mongoose.model('wastecollectioninfo', wastecollectionschema);