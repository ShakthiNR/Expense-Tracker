require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT


//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
 


//dB connection
mongoose.connect(process.env.database,{useNewUrlParser:true})
.then(()=>console.log("DataBase Connected Successfully !!!"))
.catch((err)=>console.log("Error is",err))


//Router
const auth = require("./routes/auth")
const categoryRoute = require("./routes/category")
const transactionRoute = require('./routes/transaction')


//MiddleWare for router
app.use("/api",auth)
app.use("/api",categoryRoute)
app.use('/api',transactionRoute)


app.listen(PORT,()=>console.log(`App is running successfully in ${PORT} port`))