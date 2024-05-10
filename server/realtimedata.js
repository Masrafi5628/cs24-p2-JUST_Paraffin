const mongoose = require('mongoose');

const realtimeschema = new mongoose.Schema({
    worker_id: {
        type: String
    },
    longitude: {
        type: Number,
        default: 0
    },
    latitude: {
        type: Number,
        default: 0
    },
},
    {
        collection: 'realtimeinfo'
    });

mongoose.model('realtimeinfo', realtimeschema);