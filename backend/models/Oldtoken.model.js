
const mongoose = require('mongoose')

const OldtokenSchema = new mongoose.Schema({
    token: {
      type: String,
      required: true
    }
  });

  module.exports = mongoose.model('Oldtokens',OldtokenSchema)