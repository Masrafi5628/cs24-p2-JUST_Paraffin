const mongoose = require('mongoose');

const realtimeschema = new mongoose.Schema({
    worker_id: {
        type: String
    },
    longitude: {
        type: Number,
        default: null
    },
    latitude: {
        type: Number,
        default: null
    },
},
    {
        collection: 'realtimeinfo'
    });

mongoose.model('realtimeinfo', realtimeschema);