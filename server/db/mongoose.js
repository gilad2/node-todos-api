const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.PORT ? 'mongodb://gilad:gilad19@ds263640.mlab.com:63640/node-course-test' : 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};