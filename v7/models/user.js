const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose"),
  passwordValidator = require("password-validator");

let schema = new passwordValidator();

schema
  .is().min(8)            // Minimum length 8
  .is().max(100)          // Maximum length 100
  .has().uppercase()      // Must have uppercase letters
  .has().lowercase()      // Must have lowercase letters
  .has().digits()         // Must have digits
  .has().symbols()        // Must have symbols
  .has().not().spaces()   // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    validate: {
      validator: function (password) {
        return passwordSchema.validate(password);
      },
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
    },
  },

  isadmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(passportLocalMongoose);

let user = mongoose.model("User", UserSchema);
module.exports = user;
