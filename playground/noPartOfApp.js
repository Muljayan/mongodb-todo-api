// // //Create instance
// // let newTodo = new Todo({
// //     text:'Cook Dinner'
// // });

// // //Save to db
// // newTodo.save().then((doc)=>{
// //     console.log('Saved todo ' ,doc)
// // },(err)=>{
// //     console.log('Unable to save todo ' ,err)
// // })

// // //Another todo instance
// // let otherTodo = new Todo({
// //     text:' Buy Groceries  ',
// // });
// // otherTodo.save().then((doc)=>{
// //     console.log(JSON.stringify(doc,undefined,2))
// // },(err)=>{
// //     console.log('Unable to save',err)
// // });



// let user = new User({});
// user.save().then((doc)=>{
//     console.log('User saved' , doc)
// },(err)=>{
//     console.log('Unable to print user' , err)
// })
//******************************************** */

// let mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/AppTodo');

// let Todo = mongoose.model('Todo',{
//     text:{
//         type:String,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// });

// let newtodo = new Todo({
    
// });

// newtodo.save().then((doc)=>{
//     console.log(doc)
// },(e)=>{
//     console.log('Unable to save',e)
// })

