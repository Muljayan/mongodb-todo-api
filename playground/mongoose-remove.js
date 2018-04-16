const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User}=require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

// Todo.findOneAndRemove({_id:'5ad49cbceb813cbb08b101fb'}).then((todo)=>{
    // console.log(todo)
// })

// Todo.findByIdAndRemove('5ad49cbceb813cbb08b101fb').then((todo)=>{
//     console.log(todo)
// })