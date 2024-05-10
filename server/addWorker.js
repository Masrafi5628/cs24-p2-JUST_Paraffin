const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    employeeID: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    dateOfHire: {
        type: String
    },
    jobTitle: {
        type: String
    },
    paymentPerHour: {
        type: String
    },
    contactInformation: {
        type: String
    },
    assignedCollectionRoute: {
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
        default: 'worker'
    }
},
    {
        collection: 'workerInfo'
    });

mongoose.model('workerInfo', workerSchema);