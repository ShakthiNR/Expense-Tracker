import React, {useEffect, useState } from 'react'
import Base from './Base'
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import {mailStatusHelper} from "./helper/mailStatusHelper"

const EmailVerification = () => {
  const navigate = useNavigate()
  const [values,setValues]=useState({
    error:"",
    message:""
  })
  const { verificationtoken } = useParams();
  const {error,message} = values

 const verifyUser=()=>{
    mailStatusHelper(verificationtoken).then(data=>{
      if(data.error)
      {
        setValues({ ...values, error: data.error});
      }
      else{
        setValues({...values,message:data.message})
      }
    }
    )
  }


const redirectHome=()=>{
  if(message === "Account verified" || message === "Token Already Verified")
  {
    setTimeout(()=>{
      navigate('/signin')
    },10000)
   
  }
  else if(error==="Link Not found.")
  {
    setTimeout(()=>{
      navigate('/signup')
    },10000)
  }
  if(error=="Link Expired, Create account once again !!!")
  {
    setTimeout(()=>{
      navigate('/')
    },10000)
  }
}

useEffect(
  ()=>{
    verifyUser()
  }
  ,[])  

  const displayMsg = ()=>{
    return(
      <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
<div className="max-w-md w-full mx-auto">
          <div className="text-2xl font-semibold mb-5 text-gray-900 text-center">
          <Link to='/' > Expense Tracker</Link> 
</div>
<div className="text-center font-semibold text-black  text-lg mb-2 ">
Email Verfication Status 
</div>
<div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
  
  
  <div className='text-center text-semibold text-green-600   text-lg'>
     {message} :)
       
  </div>




  

</div>


</div>

</div>
      
      </>
    )
  }

  const errorMsg = ()=>{
    return(
      <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
<div className="max-w-md w-full mx-auto">
          <div className="text-2xl font-semibold mb-5 text-gray-900 text-center">
          <Link to='/' > Expense Tracker</Link> 
</div>
<div className="text-center font-semibold text-black  text-lg mb-2 ">
Email Verfication Status 
</div>
<div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
  
  
  <div className='text-center text-semibold text-red-600   text-lg'>
     {error} :(
       
  </div>




  

</div>


</div>

</div>
      
      </>
    )
  }
  return (
    <>
    
     
      {redirectHome()}
      {error && errorMsg() }   
      {message && displayMsg()} 
    
    </>
  )
}

export default EmailVerification