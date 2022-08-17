const express = require('express')
const { createCategories, getCategories } = require('../controllers/category')
const router = express.Router()

router.post('/createCategories',createCategories)

router.get('/getCategories',getCategories)


module.exports=router