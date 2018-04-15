let mongoose = require('mongoose');

//mongoose to select builtin promise library
mongoose.Promise =global.Promise;
//connect to db
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports={mongoose}