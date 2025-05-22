const mongoose = require('mongoose');
const timestamp = require('../plugins/timestamp'); // Import plugin

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

// Virtual property for fullName
userSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (name) {
    let parts = name.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  });

// Apply timestamp plugin
userSchema.plugin(timestamp);

let UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;

// Connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a new user instance
let model = new UserModel();
model.fullName = 'Thomas Anderson';

model.save()
  .then(doc => {
    console.log("User saved:", doc);
  })
  .catch(err => {
    console.error("Error:", err);
  });
