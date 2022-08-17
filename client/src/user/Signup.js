import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import Base from './Base'
import {signup} from "../auth"
// import Timercountdown from "./Timercountdown"
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
const style = {
  ':focus': {
    border: '1px solid black'
  }
};

const Signup = () => {
  const [values,setValues]=useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmPassword:"",
    error:"",
    message:""
  })
  const [passwordShown, setPasswordShown] = useState(false);
  const [cpasswordShown, setCPasswordShown] = useState(false);

  const { register, handleSubmit,getValues, formState: { errors } } = useForm({mode:"onChange"});

 // const [flag,setFlag] = useState(false)
  const {firstname,lastname,email,password,confirmPassword,message,error} = values


  const onSubmit  = (values)=>{
 
   var lowerEmail = values.email.toLowerCase();
   values = {...values,email:lowerEmail}
   setValues({values})
  const {firstname,lastname,email,password,confirmPassword,message,error} = values
    setValues({ ...values, error: false });
    signup({firstname,lastname,email,password})
    .then(data=>{
      if(data.error)
      {
        setValues({ ...values, error: data.error });
       
      }
      else{
        console.log("data",data);
        setValues({
          ...values,
           firstname: "",
          lastname:"",
          email: "",
          password: "",
          confirmpassword:"", 
          error: "", 
          message:data.message
        }); 
      }
    }).catch((err)=>console.log(err));  
  }



  const errorMsg = ()=>{
    return(
      <>
      {error && error==="User already exists!! Sign In Instead..." ? (
        <>
        <div className="text-center font-base mb-5  text-red-600 text-base mb-3">
        {error} <Link to="/signin" className='text-blue-600 hover:underline' >Sign In</Link>
</div>
          
        </>
    ) :error }
      </>
    )
  }



  const signUpForm = ()=>{
    return(
      <>
      <div className="min-h-screen py-8 bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-2xl font-bold text-gray-900 text-center">
            <Link to='/'>Expense Tracker</Link>
          </div>
          <div className="text-lg  mt-2 text-center">
            Sign Up to create your account
          </div>
          </div>
          <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMsg()}
            <div className="flex">
              
       


              <input type="text" 
              placeholder='First Name' 
              id="firstname"
              className=
              {errors.firstname ? 
                'w-1/2 p-2 mr-3 pl-3 border focus:outline-none focus:border-red-600 bg-gray-100  border-red-600 rounded mt-1 mb-2 placeholder:text-base text-base' : 
              'w-1/2 mr-3 p-2 pl-3 border bg-gray-100  border-gray-300  rounded mt-1 mb-2 placeholder:text-base text-base focus:outline-none focus:border-gray-400'
      }

              
              {...register('firstname', { required: true, maxLength: 30,minLength:3 })}
              />


              <input type="text" 
              className='w-1/2 p-2 pl-3 border border-gray-300 focus:outline-none focus:border-gray-400 rounded mt-1 mb-2 bg-gray-100  placeholder:text-base text-base'
              placeholder='Last Name' 
              id='lastname'
              {...register('lastname')}
              />
</div>

              {errors.firstname && errors.firstname.type === "required" && <span className=' text-red-600 text-sm'>Firstname is required</span>}
              {errors.firstname && errors.firstname.type === "maxLength" && <span className='text-red-600 text-sm'>Max length is 30 character</span> }
              {errors.firstname && errors.firstname.type === "minLength" && <span className='text-red-600 text-sm'>Min length is 3 character</span> }<br className='hidden md:block'/>
<input
 id="email"
        className={errors.email ? 'w-full p-2 pl-3 border bg-gray-100 focus:outline-none focus:border-red-600   border-red-600 rounded mt-2 mb-2 placeholder:text-base text-base' : 'w-full focus:outline-none focus:border-gray-400 p-2 pl-3 border  border-gray-300 bg-gray-100  rounded mt-2 mb-2 placeholder:text-base text-base'
      }

        placeholder='Email-Address' 
        {...register("email", {
          required: "Email is required",
          onChange: (e)=>{
           
              setValues({...values,error:""})
            
           },
          pattern: {
            value: /\S+@\S+\.\S\S+/,
            message: "Email format Invalid"
          }
        })}
       
      /><br/>
      {errors.email && <span className='text-red-600 text-sm '>{errors.email.message}</span>  }<br className='hidden md:block'/>






      <div className="relative"> 
      <input
       placeholder='Password'
       className={errors.password ? 'w-full p-2 bg-gray-100 pl-3 border focus:outline-none focus:border-red-600   border-red-600 rounded mt-2 mb-2 placeholder:text-base text-base' : 'w-full focus:outline-none focus:border-gray-400 bg-gray-100  p-2 pl-3 border  border-gray-300  rounded mt-2 mb-2 placeholder:text-base text-base'
      }
      type={passwordShown ? "text" : "password"}
      id="password"
        {...register("password", {
          onChange: (e)=>{setValues({...values,password:e.target.value})},
          required: "Password is required",
          minLength: {
            value: 5,
            message: "min length is 5"
          }
        })}
        
      />
      

<div  className="absolute top-5 right-3 text-blue-500 font-medium text-sm cursor-pointer" >
            {password &&
              <button type="button" onClick={()=>{setPasswordShown(!passwordShown)} }>
              {passwordShown ?"Hide":"Show"}
              </button>
             
            }
          
          </div>
          <br />

      </div>
      
     
      {
      errors.password && (<span className='text-red-500 text-sm'>{errors.password.message} </span>)  
      } <br className='hidden md:block'/>



<div className="relative"> 
      <input
      type={cpasswordShown ? "text" : "password"}
      className={errors.confirmPassword ? 'w-full p-2 pl-3 border bg-gray-100 focus:outline-none focus:border-red-600   border-red-600 rounded mt-2 mb-2 placeholder:text-base text-base' : 'w-full focus:outline-none focus:border-gray-400 p-2 pl-3 border bg-gray-100  border-gray-300  rounded mt-2 mb-2 placeholder:text-base text-base'
      }
      

      placeholder='Confirm Password'
      {...register("confirmPassword", {
        onChange: (e)=>{setValues({...values,confirmPassword:e.target.value})},

        required: "Confirm Password is required",
        validate: (value) =>
               value === getValues("password")
    })}
/> 
<div  className="absolute top-5 right-3 text-blue-500 font-medium text-sm cursor-pointer" >
            {
              confirmPassword&&
              <button type="button" onClick={()=>{setCPasswordShown(!cpasswordShown)} }>
              {cpasswordShown ?"Hide":"Show"}
              </button>
             
            }
          
          </div>

<br/>
</div>


{errors.confirmPassword && errors.confirmPassword.type === "validate" && <span className='text-red-500 text-sm'>Passwords do not match</span>}
{errors.confirmPassword && (<span className='text-red-500  text-sm'> {errors.confirmPassword.message }</span>)  }
<br/>


<center className='mb-3 mt-1 text-sm opacity-75'>
By signing up, you agree to our Terms , Data Policy and Cookies Policy . <br/>
</center>
                <button type="submit" className='w-full bg-purple-500 text-white mt-2 
                 disabled:bg-purple-300 px-3 py-2 rounded-md text-base hover:bg-purple-600'>Sign Up</button><br/>
              {/* <button type="submit" onClick={()=>{setFlag(true)}}>Sign Up</button><br/> */}
           
      </form> 
            
</div>

<div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
            <div className="text-center text-base" style={{color:"#262626"}}>
              Have an account ? <Link to="/signin"><span className="font-medium" style={{color:"#0095F6"}}>Log In </span> </Link>
             </div>
            
</div>


          </div>






      


      
     
      
      </>
    )
  }
  const messageDisp = ()=>{
    return(
      <>


      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-2xl font-bold text-gray-900 text-center">
         <Link to='/'>Expense Tracker</Link>  
          </div>
          <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <div className="text-lg font-medium mt-2 text-center">
          Thanks for choosing Expense Tracker Application. {message} 
            
          </div>

          </div>

          

          </div>
      </div>
      
      </>
    )
  }

  return (
    <>
     
      {message && messageDisp()}
      
   
        {
       !(message=='Please check entered email to proceed further !!!') && (<>{signUpForm()} </> )
        }
    </>
  )
}

export default Signup