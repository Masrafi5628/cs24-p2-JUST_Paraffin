const mongoose = require('mongoose');

const temposschema = new mongoose.Schema({
    worker_id: {
        type: String
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
},
    {
        collection: 'tempposinfo'
    });

mongoose.model('tempposinfo', temposschema);