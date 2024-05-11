const mongoose = require('mongoose');

const contractManagerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userId: {
        type: String
    },
    email: {
        type: String
    },
    date: {
        type: String
    },
    number: {
        type: String
    },
    company: {
        type: String

    },
    access: {
        type: String

    },
    username: {
        type: String

    },
    password: {
        type: String

    },
    userType: {
        type: String,
        default: 'conmanager'
    }
},
    {
        collection: 'contractManagerInfo'
    });

mongoose.model('contractManagerInfo', contractManagerSchema);