const { response } = require("express")
const Transaction = require("../models/Transaction")

exports.createTransaction =(req,res)=>{
    const transaction = new Transaction(req.body)
  //  console.log("object",req.body);
   transaction.save((err,newTrans)=>{
        if(err)
            return res.status(400).json({error:`Unable to save Transaction in dB ${err}`})
        else
            return res.json(newTrans)
    })
}

exports.getTransactions = (req,res)=>{
 const id= req.profile._id;
 let data = Transaction.find({user:id})
 res.json(data)
}

exports.getTransaction = (req,res)=>{
    console.log("ji");
    const id= req.transaction._id;
    console.log("object",id);
    Transaction.findById(id, function (err, oneTr) {
        if (err){
            return res.status(400).json({error:`Unable to get Transaction in dB ${err}`})
        }
        else{
            return res.json(oneTr)
        }
    });

}

exports.getTransactionById=(req,res,next,id)=>{
    Transaction.findById(id).exec((err,trans)=>{
      if(err || !trans)
      {
          return res.status(400).json({error: "Transaction ID not found in database"})
      }
      req.transaction=trans //refer isAuthenticated
    
      next(); //must be there
  })
  }


exports.deleteTransaction =(req,res)=>{
  
    const id = req.transaction._id
   
   Transaction.deleteOne({_id:id}).then(
        res.json({success:`Transaction Deleted Successfully`})
    ).catch(
        err=> res.status(400).json("Error in deleting Transaction"+err)
    )
   // res.send("crt")
}


exports.updateTransaction =(req,res)=>{
    console.log("from update");

    const id=req.transaction._id
    const {name,type,amount} = req.body

     Transaction.findByIdAndUpdate(id,{name,type,amount},{new: true},function(err,updateTr){
        if(err)
        {
            return res.status(400).json({error:"Cannot update the Category"})
        }
        console.log("object",updateTr);
        res.json(updateTr)

    })

}



//Get the labels by joining two collections
exports.getLabels =(req,res)=>{
    const id=req.profile._id
    
    //Filter by userId and join category with transaction using type as pk and fk
    Transaction.aggregate([
        {
            $match:{user:id}
        },
        {
            $lookup:{
                from:"categories",
                localField:"type", //type is pk in category Model
                foreignField:"type" , //type is fk in transaction Model
                as:"categories_info",//name of output array from this
            }
        },
        {
            "$project":{
                "_id":1,
                "name":1,
                "type":1,
                "amount":1,
                "categories_info.color":1
            }
        },
        
        
        
    ]).then(result =>{
       let data = result.map(e =>Object.assign({},{_id:e._id,name:e.name,type:e.type,amount:e.amount,color:e.categories_info.color}))
       //console.log("data",result);
       
       res.json(result)
       
    }).catch(
        err=> res.status(400).json("Lookup hello collection error"+err)
    )
}