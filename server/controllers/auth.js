const User = require("../models/User")
var jwt = require("jsonwebtoken")
const {expressjwt: expressJwt} = require('express-jwt');
var nodemailer = require('nodemailer')
var jwt = require("jsonwebtoken");
var crypto = require('crypto')
const path = require('path');
const {OAuth2Client} = require("google-auth-library")
client = new OAuth2Client("1072967727195-bsb22q9v66dlk3uptqq06g841q5v466o.apps.googleusercontent.com")
const hbs = require("nodemailer-express-handlebars")



/*
Send Email -
1. We send email for email verification while signUp, resetPassword, newAccount creation
2. flag variable to differentiate the process
   a. flag = 0 => send mail for verifying email account (SignUp)
   b. flag = 1 => send mail for resetting password (ResetPassword)
   c. flag = 2 => send mail for information (newAccount Creation)
*/
const sendEmail =(name,email,verificationToken,userId,flag)=>{
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: process.env.user , 
          pass: process.env.pass , 
        },
      });
      transporter.use("compile",hbs({
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve(__dirname, "../views"),
            defaultLayout: false,
          },
          viewPath: path.resolve(__dirname, "../views"),
          extName: ".handlebars",
      }))  
    
    var mailOptions = {
        from: process.env.mymail,
        to: email,
        subject: (flag === 2)? "Your account on ExpenseTracker-" :((flag ===1)?"Password Reset for Expense Reset-":"Finish setting up your ExpenseTracker Account!-"), 
        template: (flag===2)?'accountRegistration' :((flag===1)?'passwordReset': 'index'),
        /*
        Context - 
            1. It is used to communicate between html handleBars and auth.js 
            2. we username,verificationToken, email from auth.js to html handleBars
            3. In html handleBars it is used by using {{ }}
        */
        context:{
            username:name,
            verificationToken:verificationToken,
            email:email
        }
       
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('error is',error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}


/*

SignUp + verifyAccount
SignUp
1. Field validation done by frontEnd(ReactHooks)
2. Check Email (convert to lowerCase) and save in dB
*/

exports.signup =async (req,res)=>{
   const {email} = req.body;
   const flag =0
    let existingUser;
    let verifiedAcc
    try{
        existingUser = await User.findOne({email:email})
    }
    catch(err){
        console.log("Error is",err);
    }
    try{
     verifiedAcc = await User.findOne({email: email}).select({"registrationConfirmed":1,"_id":0}).exec()      
    }
    catch(err)
    {
        console.log("Error is",err);
    }

    if(existingUser && verifiedAcc.registrationConfirmed===true)
    {
        return res.status(422).json({error: "User already exists!! Sign In Instead..."})
    }
    const user = new User(req.body);
    user.password= req.body.password; //calling virtual function to create encrytedPas nd salt for this user
    //Generate the token for verification
    const token = jwt.sign({email: email}, process.env.SECRET)
    user.verificationToken=token;
   await user.save((err,user)=>{
        if(err){
            console.log("Error is",err);
            return res.status(400).json({error:"Cannot Save User"})
        }
        else{
            //After user saved send email
            sendEmail(user.name,email,token,user._id,flag)
            res.json({
                name:user.name,
                email:user.email,
                id:user._id,
                message:
                  "Please check entered email to proceed further !!!",

            })
         
        }
    })
}


/* 
verifyAccount (After signUp) -
1. Already sent token is checked now,
2. Check the User in dB has verificationToken - if not "Link Not Found"
3. Then get registrationConfirmed flag
    a. If True then "Token is already verified"
    b. else step 4.
4. Check tokenExpire time (Note: verification Token Expires in 2hr)
    a. If expired (enterdTime > tokenExpireTime) Link Expired, Create account once again !!!
    b. If not expired 
            a. Delete remaining document with entered email (to get unique email)
            b. Sent the mail to registered account (using the Flag 2)
            c. "Account Verified"
*/
exports.verifyAcc = async (req,res)=>{

    let existingUserEmail
    let accountVerified
    let flag=2 //flag ==2 means mail to new registration
     User.findOne({verificationToken: req.params.verificationToken})
    .then(async (user) => {
        if (!user) {
          return res.status(404).json({ error: "Link Not found." });
        }
        else{
            try{
                existingUserEmail = await User.findOne({verificationToken: req.params.verificationToken}).select({"email":1,"_id":0}).exec() 
                // console.log("existing user is",existingUserEmail);
            }
            catch(err){
                console.log("Error is",err);
            }
            try{
                accountVerified= await  User.findOne({verificationToken: req.params.verificationToken}).select({"registrationConfirmed":1,"_id":0}).exec()
                //console.log("accountVerified user is",accountVerified);
            }
            catch(err){
                console.log("Error is",err);
            }
        
            /* if(accountVerified.registrationConfirmed ===false)
            {
                try{
                    existingUser = await  User.findOne({email: existingUserEmail.email,registrationConfirmed:true }) 
                    //console.log("existig user's mail is",existingUser);
                }
                catch(err){
                    console.log("Error is",err);
                }
                if(existingUser)
                {
                    return res.status(404).json({ error: "User already exists with this e-mail address" });
                }
        
            } */
            if(user.registrationConfirmed ===false)
            {
                User.findOne({verificationToken: req.params.verificationToken}).select({"verificationTokenExpires":1,"_id":0}).exec(function(err,tokenExpDt)
                {
                    if (err) {
                        return res.status(401).json({
                            error:"Error at getting tokenExpDate"+ err,
                          });
                       
                    }
                    else{
                        let tokenExpDate= tokenExpDt.verificationTokenExpires
                        let currentDateTime = new Date() 
                
                        if(new Date(tokenExpDate) > new Date(currentDateTime) )
                        {
                            user.registrationConfirmed = true;
                            user.save(async (err) => {
                                if (err) {
                                  res.status(500).json({ error: err });
                                  return;
                                }
                                else{
                                   await User.deleteMany({email:existingUserEmail.email,registrationConfirmed:false})
                                   console.log("sdd");
                                   sendEmail(user.name,existingUserEmail.email,req.params.verificationToken,user._id,flag)
                                    return res.status(200).json({
                                        message: "Account verified",
                                      });
                                }
                              });
                        }
                        else{
                            console.log("wrong time");
                            return res.status(401).json({error:"Link Expired, Create account once again !!!"})
                        }
            
                        
                    } 
                })
            }
            else{
                return res.status(401).json({
                    message:"Token Already Verified",
                  });

            }
            
        }

    }
    )
       

}

//Resend Mail - feature is not used
//resend the mail if token expires after 2 hrs 
/* exports.resend =async (req,res)=>{
    console.log("email from re-send",req.body.email);
    var email = req.body.email;
    var userName = req.body.firstName.concat(" ",req.body.lastName) 
    console.log("name is",userName);
    const flag =0

    try{
        existingUser = await User.findOne({email: email,registrationConfirmed:true }) 
        console.log("existig user's mail is",existingUser);
    }
    catch(err){
        console.log("Error is",err);
    }
    if(existingUser)
    {
        return res.status(404).json({ message: "User already exists with this e-mail address,Register with different account" });
    }


    User.findOne({email:email},function(err,user){
        if(!user) return res.status(400).json({error:"Unable to find the user"})
        if(user.registrationConfirmed) return res.status(400).json({message:"This account is already verified !"})
        
        const token = jwt.sign({email: email}, process.env.SECRET)
        user.verificationToken=token;
        user.verificationTokenExpires= new Date(+new Date() + 120*60*1000)
        user.save((err,user)=>{
            if(err){
                return res.status(400).json({error:"Cannot update User in resend part"})
            }
            else{
                //After user saved send email
                sendEmail(userName,email,token,user._id,flag)
                res.json({
                    name:user.name,
                    email:user.email,
                    id:user._id,
                    message:
                      "Link sent again! Please check your email",
    
                })
             
            }
        })
    })
} */

/*
SignIn
1. Check if account exists or not 
2. If email exists,
   a. Get the registrationConfirmed field for entered email.
   b. If it is false return "Pending Account. Please Verify Your Email!"
   c. If it is true signed in successfully.
3. If email not exists - SignUp
*/
  
exports.signin = async (req,res)=>{
    
    const {email,password} = req.body;
    //convert Entered email to lowerCase
    let existingUser = await User.findOne({email:email.toLowerCase()})
   
      if(existingUser)
      {
       await User.findOne({email:email.toLowerCase()}).select({"registrationConfirmed":1,"_id":0})
       .exec(function(err, regConfrmFlag) {
        if (err) {
            return res.status(400).json({error:'Error at getting registration confirmed flag'+ err});
        }
        else{
            //If registrationConfirmed is true enter
            if(regConfrmFlag.registrationConfirmed)
            {
                //Signed in successfully
                //convert Entered email to lowerCase
                User.findOne({email:email.toLowerCase()},(err,user)=>{
                    if(err || !user)
                    {
                        return res.status(400).json({error:"User Email Not Exists!!!"})
                    }
                    if(!user.authenticate(password))
                    {
                        return res.status(401).json({error:"Email and Password Not Matched"})
                    }
                    const token = jwt.sign({id:user._id},process.env.SECRET);
                    res.cookie("token",token,{expire:new Date()+9999})
                    const {_id,name,email} = user; //Role not used ---Check here
                    return res.json({token,user:{_id,name,email}})
                })
            }
            else{
                return res.status(401).json({
                    error: "Pending Account. Please Verify Your Email or create account once again",
                  });
            }
        }
        
    });
      }
      else{
       return res.status(422).json({error: "User Not exists!!! SignUp Instead"})
      }
     
       
   }

/*
GoogleLogin - (check its token) - used ReactGoogleLogin
1. OldUser - If we have account (registrationConfirmed + emailExists) in dB, without changing password it loggedIn
2. NewUser - If we don't have account in dB, create the document with email+secretKey as password
*/
exports.googlelogin=(req,res)=>{
    
   let flag=2;
   const {tokenId} = req.body;
   client.verifyIdToken({idToken:tokenId,audience: process.env.googleClientId})
   .then(response =>{
      const {email_verified,name,email} = response.payload;
      console.log("response.payload",response.payload.name);
      if(email_verified){
          User.findOne({email,registrationConfirmed:true}).exec((err,user)=>{
              if(err)
              {
                  return res.status(400).json({error:"Error in getting emailId at googlelogin fucntion"})
              }
              else{
                  //if user already exists
                  if(user)
                  {
                   console.log("old user");
                   const token = jwt.sign({id:user._id},process.env.SECRET);
                   res.cookie("token",token,{expire:new Date()+9999})
                   const {_id,name,email} = user; //Role not used ---Check here
                   return res.json({token,user:{_id,name,email}})
                   
                  }
                  else{
                   console.log("New user");
                      let newUser_password = email +process.env.SECRET
                      const newUser = new User({firstname:name,email});
                      newUser.password= newUser_password;
                      newUser.registrationConfirmed=true
                      const token = jwt.sign({email: email}, process.env.SECRET)
                      newUser.verificationToken=token;
                     
                      newUser.save((err,data)=>{
                       if(err)
                       {
                           return res.status(400).json({error:"Unable to save in dB... Something went wrong !!!"})
                       }
                       
                       sendEmail(data.name,data.email,data.verificationToken,data._id,flag)
                       const token = jwt.sign({id:data._id},process.env.SECRET);
                       res.cookie("token",token,{expire:new Date()+9999})
                       const {_id,name,email} = newUser; //Role not used ---Check here
                       return res.json({token,user:{_id,name,email}})

                      })


                  }
              }
          })
      }
   })

}

/*
resetPassword - check the account nd send token to registeredMail
checkToken - check the token validity (token valid for 2 hrs) nd send the mail
updatePassword - if that token is valid - update the password, else - display token expired message
*/
exports.resetpassword=(req,res)=>{
    //creating token for reset
    const email=req.body.email
    const flag =1
    crypto.randomBytes(32,(err,buffer)=>{
        if(err)
        {
            console.log("Error is",err);
        }
        const token = buffer.toString("hex") //from hexadecimal to string
        //Find the account by its email and registrationConfimred flag
        User.findOne({email:email,registrationConfirmed:true})
        .then(user=>{
            if(!user)
            {
                return res.status(422).json({error:"User don't exists with that email"})
            }
          
            user.resetPassToken = token;
            user.expireResetPassToken= new Date(+new Date() + 120*60*1000); //Expire token after 2 hrs(120min)
            user.save((err,user)=>{
                if(err){
                    console.log("Error is",err);
                    return res.status(400).json({error:"Error Occured at saving reset token"})
                }
                else{
                    //After user saved send email

                    sendEmail(user.name,email,token,user._id,flag)
                    res.json({message:"Please check your email to reset the password"})
                }
            })
           
        })
    })

}
exports.checkToken =async(req,res)=>{
    
    let sentToken=  req.params.verificationToken;
    
    let tokenIsThere;
    tokenIsThere = await User.findOne({resetPassToken:sentToken})
    
    let currentDateTime = new Date()

    let enteredTime = await User.findOne({resetPassToken:sentToken}).select({"expireResetPassToken":1,"_id":0}).exec()


    if(tokenIsThere)
    {
        if(new Date(enteredTime.expireResetPassToken) > new Date(currentDateTime))
        {
           // console.log("correct time");
            return res.status(200).json({message:""})
        }
        else{
           // console.log("not correct time");
            return res.status(401).json({error:"Link expired, Try Again !!!"})
        }

        
    }
    else{
        return res.status(401).json({error:"Link expired, Try Again !!!"})
    }


    /* if(new Date(enteredTime.expireResetPassToken) > new Date(currentDateTime))
    {
        console.log("correct");
    }
    else{
        console.log("No");
    } */


    
}
exports.updatepassword=  (req,res)=>{
    let sentToken=  req.params.verificationToken;
 
   let newPass1= req.body.newpassword1;
   let newPass2= req.body.newpassword2;
  

   User.findOne({resetPassToken:sentToken},(err,user)=>{
       if(err)
       {
           return res.status(401).json({error:"error at updating password"})
       }
    if (!user) {
        return res.status(422).json({
            error:"Link expired, Try Again !!!",
          });
        }
        
        else{
            
            if(newPass1 === newPass2)
            {
               
                user.password= newPass1;
                user.resetPassToken = undefined;
                user.expireResetPassToken= undefined;
                user.save((err,user)=>{
                    if(err || !user ){
                        console.log("Error is",err);
                        return res.status(400).json({error:"Error Occured at saving updated password reset token"})
                    }
                    else{
                       
                        return res.status(200).json({message:"Password updated successfully !!!"})
                    }
                })
               
            }
            else{
                return res.status(401).json({error:"New Passwords are not Matched !"})
            }
        }

})

       
}







//signOut - clear the cookies(token)
exports.signout = (req,res)=>{
    res.clearCookie("token")
    return res.json({message:"SignOut Successfully !!!"})
}

exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:'auth',
    algorithms:["HS256"],
})

exports.isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id && req.auth._id;
    if(!checker)
    {
        return res.status(403).json({error:"ACCESS DENIED !!!"})
    }
    next();
}


exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
      if(err || !user)
      {
          return res.status(400).json({error: "UserId not found in database"})
      }
      req.profile=user //refer isAuthenticated
    
      next(); //must be there
  })
  }