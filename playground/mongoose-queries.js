const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User}=require('./../server/models/user');

// let id = '5ad421ee90d98f20b0489fec';

// if(!ObjectID.isValid(id)){
//     console.log('Id not valid!')
// }

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo',todo);
// })

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found')
//     }
//     console.log('Todo by ID',todo);
// }).catch((e)=>{
//     console.log(e);
// })

User.findById('5ad4270eeb813cbb08b0ed13').then((user)=>{
    if(!user){
        return console.log('Unable to find User!')
    }
    console.log(JSON.stringify(user,undefined,2))
},(e)=>{
    console.log(e)
})