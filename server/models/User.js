const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    name:String,
    email:{
        type:String,
        required:true,
        trim:true
    },
    encryp_password:{
        type:String
    },
    salt:String,
    verificationToken:{
        type:String,
        unique:true
    },

    //Token - 2hr 
    //OverDoc - 3hr (if not verified)


    //verification token expires in 120 minutes
    verificationTokenExpires:{
        type:Date,
        default: ()=> new Date(+new Date() + 120*60*1000)
    },
    //Expires after 180 minutes(3hr) --- if registrationConfrmd failed then entire document deleted
    verificationExpires:{
        type:Date,
        default: ()=> new Date(+new Date()+ 180*60*1000)
    },
    registrationConfirmed:{
        type:Boolean,
        default:false
    },
    resetPassToken:String,
    expireResetPassToken:Date

},{timestamps:true})

userSchema
.virtual("password")
.set(function(password){
    this._password=password;
    this.salt=uuidv1();
    if(this.lastname === undefined)
    {
        this.name = this.firstname
    }
    else{
        this.name= this.firstname.concat(" ",this.lastname)
    }
    this.encryp_password=this.securePassword(password)
})
.get(function(){
    return this._password
})

//authenticate and securePassword - functions
userSchema.methods = {
    authenticate: function(plainpassword)
    {
        return this.securePassword(plainpassword) === this.encryp_password;
    },

    securePassword: function(plainpassword)
    {
        if(!plainpassword)
        {
            return "";
        }
        try{
            return crypto.createHmac("sha256",this.salt)
            .update(plainpassword)
            .digest("hex")
        }
        catch(err)
        {
            return "";
        }
    }
}


//Delete the document if registration failed
userSchema.index(
    {'verificationExpires':1},
    {
        expireAfterSeconds:0,
        partialFilterExpression:{'registrationConfirmed':false}
    }
)

module.exports = mongoose.model('User',userSchema)