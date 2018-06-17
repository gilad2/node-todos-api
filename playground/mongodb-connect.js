const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if (error) {
    console.log('Unable to connect to mongodb server');
  } else {
    console.log('Connected to mongodb server');
  };

  const db = client.db('TodoApp');

  // COUNT
  db.collection('Todos').find().count().then((count) => {
    console.log(`count: ${count}`);
  }, (error) => {

  });
  
  // FIND
  // db.collection('Todos').find({
  //   _id: new ObjectID('5b263cac5ad6cdba93b90e1a')
  // }).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (error) => {

  // });

  // INSERT
  // db.collection('Todos').insertOne({
  //   test: 1,
  //   data: 2
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert todo', error);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});