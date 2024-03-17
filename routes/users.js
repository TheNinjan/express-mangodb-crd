const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
})

module.exports = mongoose.model("user", userSchema)