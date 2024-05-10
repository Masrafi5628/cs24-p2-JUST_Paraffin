const mongoose = require('mongoose');

const BillDetailsSchema = new mongoose.Schema({
    totalwaste: {
        type: Number
    },
    requiredwaste: {
        type: Number
    },
    basicpay: {
        type: Number
    },
    deficit: {
        type: Number
    },
    fine: {
        type: Number
    },
    totalbill: {
        type: String
    },
},
    {
        collection: 'BillDetails'
    });

mongoose.model('BillDetails', BillDetailsSchema);
