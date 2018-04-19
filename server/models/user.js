const mongoose = require('mongoose');
const validator = require('validator');
const jwt  = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
        
      validate: {
        validator: validator.isEmail,
        //validator:(value)=>{validator.isEmail(value);}, //Same as above
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
});

UserSchema.methods.toJSON = function(){
  let user =this;
  let userObject = user.toObject();
  return _.pick(userObject,['_id','email'])
}
//Instance method
UserSchema.methods.generateAuthToken = function(){
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(),access},'secret123').toString();
  user.tokens.push({access,token});

  return user.save().then(()=>{
    return token;
  })
}

//User modal
let User = mongoose.model('User', UserSchema);



module.exports={User};

