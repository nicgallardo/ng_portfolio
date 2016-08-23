var mongoose = require('mongoose');

module.exports = mongoose.model('Visitors', {
    name: {
        type: String,
        default: ''
    }
});
