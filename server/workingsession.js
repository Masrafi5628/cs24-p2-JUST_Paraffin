const mongoose = require('mongoose');

const workingsession = new mongoose.Schema({
    login_date: {
        type: String
    },
    login_time: {
        type: String
    },
    logout_date: {
        type: String,
        default: 'null'
    },
    logout_time: {
        type: String,
        default: 'null'
    },
    total_time: {
        type: Number,
        default: 0
    },
    worker_id: {
        type: String
    },
},
    {
        collection: 'workingsessioninfo'
    });

mongoose.model('workingsessioninfo', workingsession);