const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  likedMovies: [],
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
