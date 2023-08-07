const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    EMAIL:{
        type: String,
        required: true
    },
    PASSWORD:{
        type: String,
        required: true
    },
    USER_TYPE:{
        type: String,
        required: true
    },
    NAME:{
        type: String,
        required: true
    },
    AID:{
        type: String,
        required: true
    }
})

// Export the model
module.exports = mongoose.model('users', userSchema);