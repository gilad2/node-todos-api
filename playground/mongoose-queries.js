const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');

const {ObjectID} = require('mongodb');

var id = '6b2778035d60d8c8d1357d71';

if (!ObjectID.isValid(id)) {
  console.log("Invalid Id");
} else {
  console.log("Valid Id");
};

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo one', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id', todo);
}).catch((e) => console.log(e));


