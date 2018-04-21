const mongoose = require('mongoose');
const validator = require('validator');
const jwt  = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

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

UserSchema.methods.removeToken = function(token){
  //$pull remove items from an array that match certain criteria -mongodb operator
  let user = this;

  return user.update({
    $pull:{
      tokens:{
        // token:token
        token
      }
    }
  })
}

//Model Method
UserSchema.statics.findByToken = function(token){
  let user = this;
  let decoded;

  try{
    decoded = jwt.verify(token,'secret123');
  }catch(e){
    // return new Promise ((resolve,reject)=>{
    //   reject();
    // });
    return Promise.reject('rejected');
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access':'auth'
  });
}

UserSchema.statics.findByCredentials = function(email,password){
  let User = this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return  Promise.reject();
    }
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
          resolve(user);
        }
        else{
          reject();
        }
      })
      
    })
  })
};

//Run code before 'save' event
UserSchema.pre('save',function(next){
  let user = this;
  if (user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password = hash;
        next();
      })
    })
  }else{
    next();
  }

   
});

//User modal
let User = mongoose.model('User', UserSchema);



module.exports={User};

