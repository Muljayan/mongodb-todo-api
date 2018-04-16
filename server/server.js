let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose.js')
let {Todo} = require('./models/todo');
let{User}=require('./models/user');

let app = express();

//Setup middleware
app.use(bodyParser.json())

//Setup a route
app.post('/todos',(req,res)=>{
    let todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
}) 

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
})

//GEt /todos/123456

app.get('/todos/:id',(req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
})

//DELETE route
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send(todo);
    }).catch((e) => {
      res.status(400).send();
    });
  });



app.listen(3000,()=>{
    console.log('Started on port 3000')
});

module.exports={app};