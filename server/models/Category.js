const mongoose = require('mongoose')


//Type : Saving, INvestment, Expense  - primary key
//Color: yellow,green, pink
const categorySchema = new mongoose.Schema(
    {
       type:{
        type:String
          },
          color:{
            type:String,
            default:"#FCBE44"
          }
    }
)

module.exports = mongoose.model("Category",categorySchema)

