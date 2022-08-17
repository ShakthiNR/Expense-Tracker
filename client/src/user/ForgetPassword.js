import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Base from './Base'
import { forgetPassword } from './helper/forgetPasssHelper'
const ForgetPassword = () => {

  const [email,setEmail]=useState("")
  const [values,setValues] = useState({
    error:"",
    message:""
  })
  const {error,message} = values


  const handleSubmit = (e)=>{
    e.preventDefault();
    forgetPassword(email.toLowerCase()).then(data=>{
      if(data.error)
      {
        setValues({...values,error:data.error})

      }
      else{
        setValues({...values,message:data.message})
      }
    })

  }
  let isEnable
 

 const isEnabled = ()=>{
   /*
   can also done by below
let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
 let testEmails = email
 isEnable = regex.test(testEmails.toLowerCase())
 */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isEnable = re.test(String(email).toLowerCase())
  return isEnable
 }


  const forgetPassForm = ()=>{
    return(
      <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-2xl font-bold text-gray-900 text-center">
          Trouble Logging In?
          </div>
          <div className="text-lg  mt-2 text-center">
          Enter your email, we'll send you a link to get back into your account.
          </div>
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form onSubmit={handleSubmit}>

{

  message && (<>
   <div className="text-center font-semibold  
    text-green-500 text-base mb-3">
        { message}
          </div>
  
  </>)
}
{
  error && (<>
   <div className="text-center font-semibold   text-red-600 text-base mb-3">
          {error && error}
          </div>
  
  </>)
}


       
       
            <input type="email"
            className='w-full p-2 pl-3 border bg-gray-100 focus:outline-none focus:border-gray-400 border-gray-300 rounded mt-1 mb-3 placeholder:text-base text-base' 
            onChange={
              (e)=>{
                setValues({error:"",message:""})
                setEmail(e.target.value)
              }
              }
            placeholder='Email-Address' /> <br/>


            <button type="submit" 
            className='w-full bg-purple-500 text-white mt-2  hover:bg-purple-600  disabled:bg-purple-300 px-3 py-2 rounded-md text-base'
            disabled={!isEnable}>Send Login Link</button><br/>
            
           
           
        </form>
        <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-center text-gray-600 mx-4 mb-0">OR</p>
      </div>
      <div className="mt-6 mb-1 text-center font-medium text-base">
      <Link to='/signup'>Create New Account</Link>
        </div>
</div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <div className='text-center hover:underline font-medium text-base'>
          <Link to="/signin">Back To Login</Link>
          </div>
        </div>

      </div>
     
      
      </>
    )
  }

   const displayMessage = ()=>{
    if(message ==="Please check your email to reset the password")
    {
      setTimeout(()=>{
        setValues({error:"",message:""})
      },15000)
    }
    

  } 
  return (
    <>
   {displayMessage()}
   
       {isEnabled()}
      
      
      {forgetPassForm()}
 
    </>
  )
}

export default ForgetPassword