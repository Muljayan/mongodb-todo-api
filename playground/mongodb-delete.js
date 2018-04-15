// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    let db = client.db('TodoApp');//mongo v3 and upwards
    if(err){
        return console.log('Unable to connect to MongoDB Server');
      
    }
    console.log('Connected to MongoDB Server');


    // //deleteMany
    // db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
    //     console.log(result );
    // });

    // //deleteOne
    // db.collection('Todos').deleteOne({text:"Eat Lunch"}).then((result)=>{
    //     console.log(result);
    // })

    // //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text:"Eat Lunch"}).then((result)=>{
    //     console.log(result);
    // })

    //delete using ObjectID
    db.collection('Users').findOneAndDelete({_id: new ObjectID("5ad081a1cca377e49df037a1")})
    .then((results)=>{
        console.log(JSON.stringify(results,undefined,2));
    })

    client.close();
});