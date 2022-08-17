const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

//Details of user's transaction
const transactionSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User",
    },
    name:{
        type:String,
        default:"Anonymous"
    },
    type:{
        type:String
    },
    amount:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Transaction",transactionSchema)

