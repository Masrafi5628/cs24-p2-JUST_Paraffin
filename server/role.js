const mongoose = require('mongoose');

// Schema for roles
const roleSchema = new mongoose.Schema({
    name: String
}, { collection: 'roles' });

// Schema for permissions
const permissionSchema = new mongoose.Schema({
    name: String,
    description: String
}, { collection: 'permissions' });

// Exporting models
module.exports = {
    Role: mongoose.model('Role', roleSchema),
    Permission: mongoose.model('Permission', permissionSchema)
};