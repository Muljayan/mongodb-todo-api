// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    let db = client.db('TodoApp');//mongo v3 and upwards
    if(err){
        return console.log('Unable to connect to MongoDB Server');
      
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5ad2fdc0bb0780415a20901f')
    // },{$set:{
    //     text:'Water the plants',
    //     completed:true
    // }},{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result)
    // });

    db.collection('Users').findOneAndUpdate({
        name:'Tom George'
    },{$set:{
        name: 'Jane Smith'
    },$inc:{
        age:4
    }},{
        returnOriginal:false
    }).then((result)=>{
        console.log(result)
    });


    client.close();
});