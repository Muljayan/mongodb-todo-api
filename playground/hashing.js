const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id:10
};


let token = jwt.sign(data,'4568');
console.log(token)
let decoded = jwt.verify(token,'4568');
console.log(decoded);



// let message = 'I am user number1';

// let hash = SHA256(message).toString();
// console.log(`Message :${message} hashed as ${hash}`);

// let data = {
//     id:4
// };

// let token ={
//     data,
//     hash:SHA256(JSON.stringify(data)+'someSecret').toString()
// };

// let resultHash = SHA256(JSON.stringify(token.data)+'someSecret').toString();

// if(resultHash ===token.hash){
//     console.log('Data wasnt changed')
// }else{
//     console.log('WARNING! Data was changed!')
// }