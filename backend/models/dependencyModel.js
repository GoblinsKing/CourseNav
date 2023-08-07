const mongoose = require('mongoose');

const dependencySchema = new mongoose.Schema({
    CODE:{
        type: String,
        required: true
    },
    NAME:{
        type: String,
        required: true
    },
    PREREQUISITE_CODE:{
        type: String,
        required: true
    },
    PREREQUISITE_NAME:{
        type: String,
        required: true
    }
})

// Export the model
module.exports = mongoose.model('dependencies', dependencySchema);