import React, { useState } from "react";
import Base from "./Base";
import { Link, Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth";
import Googlelogin from "./Googlelogin";
var isEnable
const Signin = ({signedIn,setSignedIn}) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });
  const { email, password, error, didRedirect } = values;
  const [passwordShown, setPasswordShown] = useState(false);
  const [clicked,setClicked] =useState(false) 
  const {user}= isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value }); 
  };


const handleSubmit = (e)=>{
    e.preventDefault();
    setValues({...values,error:false,loading:true})
    setClicked(true)
    signin({email,password}).then(data=>
      {
        if(data.error)
        {
          
          setValues({...values,error:data.error,loading:false})
          
        }
        else{
          authenticate(data,()=>setValues({...values,didRedirect:true}))
          setSignedIn(true)
        }
        setClicked(false)
      }
      )

  }

const performNavigate = ()=>{
    if(didRedirect)
    {
      if(isAuthenticated())
      {
        return <Navigate replace to='/' />
      }
    }
  }




 const isEnabled = ()=>{
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log("pass",password.length);
  isEnable = regex.test(String(email).toLowerCase())&& password.length>=5
  return isEnable
 }

const signInForm = () => {
    return (
      <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
      <div className="text-2xl font-bold text-gray-900 text-center">
      <Link to='/'> Expense Tracker</Link>  
        </div>
        <div className="text-lg  mt-2  text-center">
        Login to your account
        </div>

        </div>
       
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">


{
  error && (
    <>
    
    <div className="text-center  mb-2 text-red-600 text-lg">

      {
       error
      }
      
    </div>
    </>
  )
}

          
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email-Address"
            value={email}
            className="w-full p-2 pl-3 border border-gray-300 rounded mt-1 
             bg-gray-100 focus:outline-none focus:border-gray-400 active:outline-none
            placeholder:text-base text-base"
            onChange={handleChange("email")}
          />
          <br />

         
<div className="relative"> 

          <input
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 pl-3 border bg-gray-100 
            focus:outline-none focus:border-gray-400 active:outline-none
             border-gray-300 rounded placeholder:text-base text-base  "
            onChange={handleChange("password")}
          />
          <div  className="absolute top-3 right-3 text-blue-500 font-medium text-base cursor-pointer" >
            {
              password && <button type="button" onClick={()=>{setPasswordShown(!passwordShown)} }>
              {passwordShown ?"Hide":"Show"}
              </button>
             
            }
          
          </div>
      

          </div>



          <div className="flex justify-between ">
        <div></div>
        <div >
        <Link className="font-medium text-base text-purple-700" to="/forget-password">Forget Password</Link>
        </div>
        </div>


          <button type="submit" className="w-full text-base bg-purple-500
          hover:bg-purple-600
           text-white mt-2 disabled:bg-purple-300 px-3 py-2 
           rounded-md" disabled={!isEnable}>

            {
              clicked ? (
              <span> 
                <svg role="status" class="inline w-8 h-8 mr-2 text-gray-400 animate-spin  fill-gray-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
          </span> ) :"Log In"
            }
            
            </button>
        </form>
        
        <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-center text-gray-600 mx-4 mb-0">OR</p>
          </div>

        <div className="mt-6 mb-1">
      <Googlelogin setValues={setValues} values={values} signedIn={signedIn} setSignedIn={setSignedIn}/>

        </div>
        
        
       
       
        </div>
        
        
      
        
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <div className="text-center text-base" style={{color:"#262626"}}>
         Don't have an account ? <Link to="/signup"><span className="font-medium" style={{color:"#0095F6"}}>Sign Up </span> </Link>
        </div>

        </div>

          </div>
        
      </>
    );
  };

  return (
    <>
     
   
     
      
      {isEnabled()}
      {signInForm()}
     
      {performNavigate()}
      
      
     
  </>
  );
};

export default Signin;
