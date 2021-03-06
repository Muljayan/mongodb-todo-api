const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const  {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose.js')
let {Todo} = require('./models/todo');
let{User}=require('./models/user');
let {authenticate} = require('./middleware/authenticate');


let app = express();

//Setup middleware
app.use(bodyParser.json())

//Setup a route
app.post('/todos',authenticate,(req,res)=>{
    console.log('Sending:',req.body);
    let todo = new Todo({
        text:req.body.text,
        _creator:req.user._id
    });
    //save to db
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
}) 

app.get('/todos',authenticate,(req,res)=>{
    Todo.find({
        _creator:req.user._id
    }).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
})



//GET /todos/123456
    //:id is a url parameter
app.get('/todos/:id',authenticate,(req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findOne({
        _id:id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
})

//DELETE route
app.delete('/todos/:id',authenticate, (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send(todo);
    }).catch((e) => {
      res.status(400).send();
    });
  });

//Patch routes
app.patch('/todos/:id',(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body,['text','completed']);//User can only update these


    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
      }
  
    if(_.isBoolean(body.completed)&&body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    //Query to update db //{new:true} is similar to return original of mongodb
    Todo.findOneAndUpdate({
        _id:id,
        _creator:req.user._id
    },{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })  
});
  
//POST /users
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);
    


    user.save().then(() => {
        return user.generateAuthToken();
     
    }).then((token)=>{
        res.header('x-auth',token).send(user);//x-auth is custom header
    }).catch((e) => {
        console.log(e);
      res.status(400).send(e);
    })
  });

// let authenticate = (req,res,next)=>{
//     let token = req.header('x-auth');

//     User.findByToken(token).then((user)=>{
//         if(!user){
//             return Promise.reject();
//         }
//         req.user = user;
//         req.token = token;
//         next();
//     }).catch((e)=>{
//         res.status(401).send();
//     });
// }
  
app.get('/users/me',authenticate,(req,res)=>{
    // let token = req.header('x-auth');

    // User.findByToken(token).then((user)=>{
    //     if(!user){
    //         // return Promise.reject();
    //     }
    //     res.send(user);
    // }).catch((e)=>{
    //     // res.status(401).send();
    // });
    res.send(req.user);

})

//POST /users/login(email,password)
app.post('/users/login',(req,res)=>{
    let body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
          });
    }).catch((e)=>{
        res.status(400).send();
    })
});
 
app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    });
},()=>{
    res.status(400).send();
});
 



app.listen(3000,()=>{
    console.log('Started on port 3000')
});


module.exports={app};
