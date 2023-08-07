const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    SCODE:{
        type: String,
        required: true
    },
    CODE:{
        type: String,
        required: true
    },
    GRADE:{
        type: String,
        required: true
    },
    PSID:{
        type: String,
        required: true
    }
})
gradeSchema.index({CODE: 1});
// Export the model
module.exports = mongoose.model('grades', gradeSchema);