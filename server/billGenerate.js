const mongoose = require('mongoose');

const BillDetailsSchema = new mongoose.Schema({
    registrationNumber: {
        type: String, unique: true
    },
    wasteVolume: {
        type: Number
    },
    billAmount: {
        type: Number
    },
},
    {
        collection: 'BillDetails'
    });

mongoose.model('BillDetails', BillDetailsSchema);
