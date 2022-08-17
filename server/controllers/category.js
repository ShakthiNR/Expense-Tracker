
const Category = require("../models/Category")

exports.createCategories =  (req,res)=>{

    const category = new Category(req.body);
     category.save((err,category)=>{
        if(err)
            return res.status(400).json({error:"Not able to save in dB"+err})
        else
            return res.json(category)
    })
}

exports.getCategories = (req,res)=>{
/* 
    //get all data in dB
    let data =   Category.find({})

    //filter type and color from Category Model

    let filteredData =  data.map(e=>Object.assign({},{type:e.type,color:e.color}))
    return res.json(filteredData)
     */
    Category.find().exec((err,categories)=>{
        if(err)
        {
            return res.status(400).json({error:"Not able fetch categories in Db"})
        }
        res.json(categories)
    })

}
