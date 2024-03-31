// const mongoose = require('mongoose');

// const stsDetailsSchema = new mongoose.Schema({

//     wardNumber: {
//         type: String
//     },
//     capacity: {
//         type: String
//     },

//     latitude: {
//         type: Number
//     },
//     longitude: {
//         type: Number
//     },
//     managers: {
//         type: [String],
//         default: []
//     }
// },
//     {
//         collection: 'stsInfo'
//     }
// );

// mongoose.model('stsInfo', stsDetailsSchema);

const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    truckNumber: {
        type: Number,
        unique: true
    },
    capacity: {
        type: Number
    }
});

const stsDetailsSchema = new mongoose.Schema({
    wardNumber: {
        type: String,
        unique: false
    },
    capacity: {
        type: Number
    },
    location: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    managers: {
        type: [String],
        default: []
    },
    trucks: [truckSchema] // Embedding truck schema as a subdocument array
},
    {
        collection: 'stsInfo'
    });

mongoose.model('stsInfo', stsDetailsSchema);


