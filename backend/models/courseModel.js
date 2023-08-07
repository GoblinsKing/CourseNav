const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    CODE:{
        type: String,
        required: true
    },
    NAME:{
        type: String,
        required: true
    }
})

// Export the model
module.exports = mongoose.model('courses', courseSchema);