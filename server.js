const exp = require("express")
//express object internally contains http server also
const app = exp();

app.listen(3500,()=>console.log("Web Server listening at 3500 port number"))

const path= require("path")

//connect react build
app.use(exp.static(path.join(__dirname,'./build')))

//GET MONGO CLIENT
const mClient= require('mongodb').MongoClient;

//connect to DB server using Mongo Client
mClient.connect('mongodb://localhost/27017')

.then((dbRef)=>{
    //connect to database
    const dbObj=dbRef.db("expenseTracker")
    //connect to collections
    const usersCollectionObj = dbObj.collection("users")
    const transactionsCollectionObj = dbObj.collection('transactions')
    console.log("DB connection success")

    //Share collections to API
    app.set('usersCollectionObj',usersCollectionObj);
    app.set('transactionsCollectionObj',transactionsCollectionObj);
})
.catch((err)=> console.log("database server connection error: ",err));




//importing and using users API
const usersApp = require('./APIs/usersApi')
app.use('/users-api',usersApp)

//using separate file as API
const transactionsApp = require('./APIs/transactionsApi')
app.use('/transactions-api',transactionsApp)


const pageRefresh=(req,res,next)=>{
    res.sendFile(path.join(__dirname, "./build/index.html"));
}
app.use('*',pageRefresh)


  /*
//middle ware for invalid path
const invalidPathMW=(req,res,next)=>{
    res.send({message:"INVALID PATH"})
}
app.use("*",invalidPathMW);
*/


//error handling middleware
const errorhandleMW=(error,req,res,next)=>{
    res.send({message:error.message,source:"Error handling middleware"})
}
app.use(errorhandleMW);