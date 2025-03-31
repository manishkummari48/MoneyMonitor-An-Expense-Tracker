const jwt = require("jsonwebtoken")

//middleware function to verify token
const verifyToken=(req,res,next)=>{
    //get Bearer token from req.headers
    const bearerToken = req.headers.authorization; // Bearer token
    if(bearerToken === undefined){
        res.status(401).send({message: "Unauthorized access... Please login first"})
    }
    else{
        //get token from Bearer token
        const token= bearerToken.split(" ")[1] //['Bearer',token]
        //verify token
        try{

            const decoded= jwt.verify(token,'abcdef')
            req.user = decoded 
            

            //calling next middleware
            next()
        }
        catch(err){
            next(new Error("Session expired. Please relogin to continue"))
        }
    }
        


}
module.exports=verifyToken;