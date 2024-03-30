const mongoose = require('mongoose');

const RouteViewSchema = new mongoose.Schema({

    lat1: {
        type: Number
    },
    long1: {
        type: Number
    },
    lat2: {
        type: Number
    },
    long2: {
        type: Number
    },
},
    {
        collection: 'routeview'
    });

mongoose.model('routeview', RouteViewSchema);
