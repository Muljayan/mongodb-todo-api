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
    if(err){
        return console.log('Unable to connect to MongoDB Server');
      
    }
    console.log('Connected to MongoDB Server');

    // //Fetch the todos as a n array
    // db.collection('Todos').find({
    //     //_id: "5ad07be5cca377e49df03652" WILL NOT WORK
    //     _id: new ObjectID("5ad07be5cca377e49df03652")
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2))
    // },(err)=>{
    //     console.log('Unable to fetch todos',err)
    // });
    //     //toArray() here calls a promise


        // db.collection('Todos').find({}).count().then((count)=>{
        //     console.log(`Todos count : ${count}`);
        // },(err)=>{
        //     console.log('Unable to fetch todos',err)
        // });

        db.collection('Users').find({name:"Jerry Tim "}).toArray().then((docs)=>{
            console.log(JSON.stringify(docs,undefined,2));
        },(err)=>{
            console.log('Unable to fetch users',err)
        })
    //client.close();//Close connection to mongo server 
        //mongo v3 and upwards
});