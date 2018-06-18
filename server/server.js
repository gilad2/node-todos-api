var express = require('express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {User}     = require('./models/user');
var {Todo}     = require('./models/todo');


var app = express();

app.listen(3000, () => {
  console.log('Started on port 3000');
});

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    console.log('note save successfully:\n', JSON.stringify(doc, undefined, 2));
    res.send(doc);
  }, (error) => {
    console.log('unable to save note', error);
    res.status(400).send(error);
  });
});

module.exports = {
  app
}



// var newTodo = new Todo({
//   text: 123
// });

// newTodo.save().then((doc) => {
//   console.log('note save successfully:\n', JSON.stringify(doc, undefined, 2));
// }, (error) => {
//   console.log('unable to save note', error);
// });

// var user = new User({
//   email: "gilad@gmail.com"
// });

// user.save().then((doc) => {
//   console.log('user save successfully:\n', JSON.stringify(doc, undefined, 2));
// }, (error) => {
//   console.log('unable to save user', error);
// });