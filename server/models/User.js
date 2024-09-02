const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // You can add more fields as needed, for example:
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   trim: true
  // },
  // profilePicture: {
  //   type: String,
  //   default: ''
  // },
});

const User = mongoose.model('User', userSchema);

module.exports = User;