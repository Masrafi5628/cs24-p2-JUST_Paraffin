const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({

    username: String,
    email: { type: String, unique: true },
    password: String,
    userType: String,
},
    {
        collection: 'userInfo'
    }
);

mongoose.model('userInfo', userDetailsSchema);