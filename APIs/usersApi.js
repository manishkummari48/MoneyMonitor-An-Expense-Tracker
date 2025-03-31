const exp = require("express")
//mini-express object (A router)
const usersApp = exp();

const expressAsyncHandler=require("express-async-handler")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyToken= require("./middlewares/verifyToken")

//to get body of object, we need body parser middleware
//It is middle ware for converting json object to js object
usersApp.use(exp.json())



//CREATE USERS API

//user sign up
//PUBLIC ROUTE
usersApp.post("/register",expressAsyncHandler(async(req,res)=>{
    //get usersCollectionObj 
    const usersCollectionObj =req.app.get("usersCollectionObj")

    //get  newUser from request
    const newUser =req.body;
    
    //check for duplicate user by username
    let userOfDB = await usersCollectionObj.findOne({username:newUser.username})
    //if user already existed
    if(userOfDB !=null){
        res.status(200).send({message:"Username already existed.Please use an other one"})
    }
    else{
        //hash the password
        let hashedPassword=await bcryptjs.hash(newUser.password,3)
        //replace plain password with hashed password
        newUser.password= hashedPassword;
        //insert user
        await usersCollectionObj.insertOne(newUser)
        res.status(201).send({message:"User registered"})
    }


}))

//user login
usersApp.post("/login",expressAsyncHandler(async(req,res)=>{

    //get usersCollectionObj 
    const usersCollectionObj =req.app.get("usersCollectionObj")

    //get  user credentials from request
    const userCredObj =req.body;
    
    //verify username
    let userOfDB = await usersCollectionObj.findOne({username:userCredObj.username})
    //if username not matched
    if(!userOfDB){
        res.status(200).send({message: "Invalid username"})
    }
    //if username matched
    else{
        //verify password
        let isEqual = await bcryptjs.compare(userCredObj.password,userOfDB.password)
        //if password not matched
        if(!isEqual){
            res.status(200).send({message: "Invalid password"})
        }
        //if password matched
        else{
            //create JWT token
            let jwtToken = jwt.sign({username:userOfDB.username},'abcdef',{expiresIn:'1d'})
            //send token to client app
            //send details of user who logged in to application,so that other components have to know
            delete userOfDB.password;
            res.status(200).send({message:"success", token:jwtToken,user:userOfDB})
        }
        
    }
}))

usersApp.get("/verify-user", verifyToken, expressAsyncHandler(async(req, res) => {
    const usersCollectionObj = req.app.get("usersCollectionObj")
    
    // Get username from token
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, 'abcdef')
    
    // Get user data
    const userOfDB = await usersCollectionObj.findOne({username: decoded.username})
    
    if(userOfDB) {
        delete userOfDB.password
        res.status(200).send({success: true, user: userOfDB})
    } else {
        res.status(401).send({success: false, message: "User not found"})
    }
}))



module.exports=usersApp;