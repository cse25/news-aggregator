const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  favorites: Array
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // Get access to the user model
  const user = this; // user.email, user.password

  // Generate a salt then run callback
  bcrypt.genSalt(10, function(error, salt) {
    if (error) { return next(error); }

    // Hash password using the salt
    bcrypt.hash(user.password, salt, null, function(error, hash) {
      if (error) { return next(error); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
    if (error) {
      return callback(error);
    }

    callback(null, isMatch);
  })
}

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
