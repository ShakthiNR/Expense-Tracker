const express = require('express')
const { getUserById } = require('../controllers/auth')
const { createTransaction, getTransactions, deleteTransaction, getTransactionById, getLabels, updateTransaction, getTransaction } = require('../controllers/transaction')
const router=express.Router()

//get UserId
router.param("userId",getUserById)
router.param("transactionId",getTransactionById)


router.post('/createTransaction',createTransaction)
router.get('/getTransaction/:userId',getTransactions)
router.get('/getoneTransaction/:transactionId',getTransaction)
router.delete('/deletetransaction/:transactionId',deleteTransaction)
router.put('/updateTransaction/:transactionId',updateTransaction)


router.get('/getLabels/:userId',getLabels)

module.exports=router