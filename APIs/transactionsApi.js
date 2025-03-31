const exp = require("express")
const { ObjectId } = require("mongodb");
//mini-express object (A router)
const transactionsApp = exp();

const expressAsyncHandler=require("express-async-handler");
const verifyToken = require("./middlewares/verifyToken");


//to get body of object, we need body parser middleware
//It is middle ware for converting json object to js object
transactionsApp.use(exp.json())

transactionsApp.post("/add-transaction",verifyToken, expressAsyncHandler(async(req,res) =>{
    const transactionsCollectionObj = req.app.get("transactionsCollectionObj")
    
    const newTransaction = req.body
    await transactionsCollectionObj.insertOne(newTransaction)
    res.status(200).send({message:"Transaction added"})
    //console.log(newTransaction)
    
}))

transactionsApp.get("/get-transactions/:username", verifyToken, expressAsyncHandler(async(req,res) =>{
    const usernameParams = req.params.username
    const transactionsCollectionObj = req.app.get("transactionsCollectionObj")
    
    let dataDB= await transactionsCollectionObj.find({"username": usernameParams}).toArray()
    res.send({message: "transactions",payload: dataDB})
    
}))


transactionsApp.delete("/delete-transaction/:id", verifyToken, expressAsyncHandler(async (req, res) => {
    const transactionsCollectionObj = req.app.get("transactionsCollectionObj");

    try {
        const transactionId = req.params.id;

        // Convert transactionId to ObjectId
        const result = await transactionsCollectionObj.deleteOne({ _id: new ObjectId(transactionId) });

        if (result.deletedCount === 1) {
            res.send({ message: "Transaction deleted successfully" });
        } else {
            res.status(404).send({ message: "Transaction not found" });
        }
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));

module.exports=transactionsApp;