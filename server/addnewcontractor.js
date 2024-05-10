const mongoose = require('mongoose');

const contractorschema = new mongoose.Schema({
    //   contractorid,company,registrationid,registrtiondate,
    // tinnumber,
    // contactnumber,
    // workforcesize,
    // paymentofwaste,
    // requiredamount,
    // contractduration,
    // areaofcollection,
    // designatedsts
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