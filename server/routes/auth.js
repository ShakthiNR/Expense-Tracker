const express = require('express')
const { signup, signin, signout, verifyAcc, resetpassword, updatepassword, checkToken, googlelogin } = require('../controllers/auth')
const router = express.Router()

//Sign,SignUp,SignOut
router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signout',signout)
//googleLogin
router.post("/googlelogin",googlelogin)





//Valid-Email Verification - verification through verificationToken
router.get("/confirm/:verificationToken",verifyAcc)


/* router.post("/verification/account/resend/",resend) */




//resetPassword - send token
//check token - check the validity of token
//updatePassword - if token valid update the password
router.post("/reset-password",resetpassword)
router.get("/checktoken/:verificationToken",checkToken)
router.post("/password/reset/:verificationToken",updatepassword)



module.exports=router