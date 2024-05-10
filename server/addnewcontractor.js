const mongoose = require('mongoose');

const contractorschema = new mongoose.Schema({
    contractorid: {
        type: String
    },
    company: {
        type: String
    },
    registrationid: {
        type: String
    },
    registrationdate: {
        type: String
    },
    tinnumber: {
        type: String
    },
    contactnumber: {
        type: String
    },
    workforcesize: {
        type: String
    },
    paymentofwaste: {
        type: Number
    },
    requiredamount: {
        type: Number
    },
    contractduration: {
        type: String
    },
    areaofcollection: {
        type: String
    },
    designatedsts: {
        type: String
    }

},
    {
        collection: 'contractorinfo'
    });

mongoose.model('contractorinfo', contractorschema);