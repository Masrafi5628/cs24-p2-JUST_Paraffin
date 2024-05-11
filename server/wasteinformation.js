const mongoose = require('mongoose');

const wasteinfoSchema = new mongoose.Schema({

    contractorId: {
        type: String
    },
    timeanddate: {
        type: String
    },
    amountofwaste: {
        type: Number
    },
    typeofwaste: {
        type: String
    },
    designatedSTS: {
        type: String
    },
    vehiclesusedfortransformation: {
        type: String
    },
},
    {
        collection: 'wasteInfo'
    }
);

mongoose.model('wasteInfo', wasteinfoSchema);