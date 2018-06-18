var express = require('express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {User}     = require('./models/user');
var {Todo}     = require('./models/todo');

var {ObjectID} = require('mongodb');

var app    = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    console.log('todo saved successfully:\n', JSON.stringify(doc, undefined, 2));
    res.send(doc);
  }, (error) => {
    // console.log('unable to save todo', error);
    res.status(400).send(error);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (error) => {
    res.status(400).send(error);
  });
});

app.get('/todos/:id', (req, res) => {
  var id =  req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(req.params.id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
        
    res.send({todo});
  })
}, (error) => {
  res.status(400).send(error);
});

app.delete('/todos/:id', (req, res) => {
  var id =  req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({});
  }, (error) => {
    return res.status(404).send();
  });

}, (error) => {
  return res.status(404).send();
});

module.exports = {
  app
}

app.listen(port, () => {
  console.log('Started on port 3000');
});

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