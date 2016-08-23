var mongoose = require('mongoose');

module.exports = mongoose.model('Contacts', {
  firstName: {
      type: String,
      default: ''
  },
  lastName: {
      type: String,
      default: ''
  },
  phone: {
      type: String,
      default: ''
  },
  email: {
      type: String,
      default: ''
  },
  message: {
      type: String,
      default: ''
  },
});
