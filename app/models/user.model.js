// ```
// user.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// user.model.js may be freely distributed under the MIT license
// ```

// */app/models/user.model.js*

// ## User Model

// Note: MongoDB will autogenerate an _id for each User object created

// Grab the Mongoose module
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Import library to hash passwords
import bcrypt from 'bcrypt-nodejs';

// Define the schema for the showcase item
let userSchema = mongoose.Schema({

  username: {type: String, required: true},

  password: {type: String, required: true},

  passwordDate: {type: Date, default: Date.now},

  email: {type: String, required: true, index: {unique: true}}

});

userSchema.pre('save', function (next) {

  let user = this;

  user.password = user.generateHash(user.password);

  next();
});

// ## Methods

// ### Generate a hash
userSchema.methods.generateHash = function (password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// ### Check if password is valid
userSchema.methods.validPassword = function (password) {

  return bcrypt.compareSync(password, this.password);
};


// Create the model for users and expose it to the app
export default mongoose.model('User', userSchema);
