// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
    
    // //Object destructuring //ES6 //WHAT HAPPENS ABOVE
    // let user = {name:'Tom',age:36};
    // let {name}=user;
    // console.log(name);//prints Tom

    // let obj = new ObjectID();
    // console.log(obj);

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    let db = client.db('TodoApp');//mongo v3 and upwards
                                //above creates the TodoApp db
    if(err){
        return console.log('Unable to connect to MongoDB Server');
      
    }
    console.log('Connected to MongoDB Server');



    // Adding data to todos colleciton
    //     Insert one adds a document to collection
    db.collection('Todos').insertOne({
        text:'Something to do',
        completed:false
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert todo',err)
        }
        console.log(JSON.stringify(result.ops,undefined,2))
        //ops returns all documetns inserted

    });


    // db.collection('Users').insertOne({
    //     name:'Tom George',
    //     age:36,
    //     location:'Berlin'
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert user',err)
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2))
    //     console.log(result.ops[0]._id.getTimestamp());
    // })

    client.close();//Close connection to mongo server 
        //mongo v3 and upwards
});