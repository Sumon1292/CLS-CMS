
const mongoose = require('mongoose')

const OtpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    otpcode: {
      type: String,
      required: true
    },
    otpexp: {
      type: Date,
      required: true
    }
  });

  module.exports = mongoose.model('Otp',OtpSchema)