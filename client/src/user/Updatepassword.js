import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Base from"./Base"
import {  checkToken, updatePassword } from './helper/forgetPasssHelper';


const Updatepassword = () => {
  const { verificationToken } = useParams();
  const navigate =useNavigate()
  const [pass1,setPass1] =useState("")
  const [pass2,setPass2] =useState("")
  const [Loading,setLoading] = useState(true)
  const [alert,setAlert] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false);
  const [cpasswordShown, setCPasswordShown] = useState(false);



const [hide,setHide]=useState(false)
  const [values,setValues]=useState({
    message:"",
    error:""
  })
  const {error,message} = values



  const alertFn = ()=>{
    return(
      <>
      <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-sm text-red-700 inline-flex items-center w-full" role="alert">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
  </svg>
  <div className='ml-4'>
  Password Not Matched. Try Again
  </div>
 
</div>
    
      </>
    )
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if (pass1 != pass2) {
console.log("helo");

setAlert(true)
      //alert ("\nPassword did not match: Please try again...")


      return;
  }
    updatePassword(pass1,pass2,verificationToken).then(data=>{
      if(data.error)
      {
        
        setValues({...values,error:data.error})
      }
      else{
        setValues({...values,message:data.message})
      }
    })
  }

const tokenCheck = ()=>{
  checkToken(verificationToken).then(data=>{
    if(data.error)
    {
      setLoading(false)
      setValues({...values,error:data.error})
      setHide(true)
    }
    else{
      
      setValues({...values,message:data.message})
      setValues({...values,
                error:""})
                setLoading(false)

    }
  })
  
}
useEffect(
    ()=>{
      tokenCheck()
    },[]
  )

let isEnable
const isEnabled = ()=>{
   isEnable = pass2.length>=5 && pass1.length>=5
   return isEnable
  }

const updateForm = ()=>{
  return(<>

<div className="min-h-screen bg-gray-50 flex flex-col justify-center">
<div className="max-w-md w-full mx-auto">
<div className="text-2xl font-bold text-gray-900 text-center">
        <Link to='/' > Expense-Tracker</Link> 
   </div>
   <div className="text-lg  mt-2 text-center">
          Enter your new password to update.<br/> Minimum 5 characters required
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
{alert && alertFn()}


<div className="relative">


          <input 
          type={passwordShown ? "text" : "password"}
          className='w-full bg-gray-100 focus:outline-none focus:border-gray-400 border-gray-300 p-2 pl-3 border border-gray-300 rounded mt-1 mb-3 placeholder:text-base text-base'
            onChange={
              (e)=>
              {
                setPass1(e.target.value)
                setAlert(false)
                setValues({message:"",
                error:""})
                tokenCheck()
              }
            }
           placeholder='New Password' />

<div  className="absolute top-4 right-3 text-gray-700 font-semibold text-base cursor-pointer" >
            {
              pass1 && <button type="button" onClick={()=>{setPasswordShown(!passwordShown)} }>
              {passwordShown ?"Hide":"Show"}
              </button>
             
            }
          
          </div>
          </div>
          <div className="relative">
          <input type={cpasswordShown ? "text" : "password"}
          className='w-full bg-gray-100 focus:outline-none focus:border-gray-400 border-gray-300 p-2 pl-3 border border-gray-300 rounded mt-4 mb-3 placeholder:text-base text-base'
            onChange={
              (e)=>
              {
                setPass2(e.target.value)
                setAlert(false)
                setValues({message:"",
                error:""})
                tokenCheck()
              }
            }
          placeholder='Confirm New Password' 
          />
          <div  className="absolute top-6 right-3 text-gray-700 font-semibold text-base cursor-pointer" >
            {
              pass2 && <button type="button" onClick={()=>{setCPasswordShown(!cpasswordShown)} }>
              {cpasswordShown ?"Hide":"Show"}
              </button>
             
            }
          
          </div>
          
          </div>
          
          <button type="submit" 
          className='w-full bg-purple-500 hover:bg-purple-600 text-white mt-6  disabled:bg-purple-300 px-3 py-2 rounded-md '
          disabled={!isEnable}>Update Password</button>
      </form>


  </div>
  
  </div>

  



 
  </>)
}

const displayMessage=()=>{
  if(message=='Password updated successfully !!!')
  {
    setTimeout(()=>{
      navigate("/signin")
    },5000)  
  }
}

const errorLink = ()=>{
  return(
    <>
<div className="min-h-screen bg-gray-50 flex flex-col justify-center">
<div className="max-w-md w-full mx-auto">
          <div className="text-2xl font-semibold mb-10 text-gray-900 text-center">
          <Link to='/' > Expense-Tracker</Link> 
</div>
<div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
<div className="text-center font-semibold text-red-600 text-lg mb-3">
{error}

  </div>
  <div className='text-center text-base mt-6 '>
     Forget-Password link automatically 
     <div>expired after 2 hours !</div> 
     <div> (or) </div> 
      <div>
      Password already updated using this link !
      </div>
       
  </div>
</div>
<div className="max-w-md w-full mx-auto border-t-0 bg-white p-8 border border-gray-300">
          <div style={{color:"#0095F6"}} className='text-center font-semibold text-base hover:underline'>
          <Link to="/signin">Back To Login</Link>
          </div>
        </div>

</div>

</div>
{/* {
setTimeout(() => {
  navigate("/")
}, 15000)
} */}

    
    </>
  )
}
 
const loading = ()=>{
  return(
    <>
    <div className="min-h-screen flex flex-col justify-center">
    <div className="max-w-md w-full mx-auto">
      <div className="text-center">
      Loading ...
      </div>
      </div>
      
    </div>
    </>
  )
}

  return (
    <>
    
      
    {isEnabled()}
    {displayMessage()}
    {
      Loading ? loading() : (
      <>
  {error && errorLink()}
  { hide ? " " :updateForm()} 
      </>)
    }
 
   
    
    </>
  )
}

export default Updatepassword