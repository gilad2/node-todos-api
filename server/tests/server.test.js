const expect  = require('expect');
const request = require('supertest');

const {app}  = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');


const todos = [{
  _id:  new ObjectID(),
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('Post /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      }).end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it ('should not create a new todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});


describe('GET /todos', () => {
  it ('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((response) => {
        expect(response.body.todos.length).toBe(2);
      })
      .end(done);
  });
});


describe('GET /todos/:id', () => {
  it ('should get the requested todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it ('should return 404 when id not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it ('should return 404 when is invalid', (done) => {
    request(app)
      .get('/todos/1')
      .expect(404)
      .end(done);
  });
});


describe('DELETE /todos/:id', () => {
  it ('should delete the first todo', (done) => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .end((err, res) => {
        Todo.count({}).then((todos_count) => {
          expect(todos_count).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });

  it ('should return 404 when id not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it ('should return 404 when is invalid', (done) => {
    request(app)
      .delete('/todos/1')
      .expect(404)
      .end(done);
  });
});

