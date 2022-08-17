import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script"
import axios from "axios"
import { authenticate } from '../auth';
import { API, googleClientId } from '../backend';


const Googlelogin = ({setValues,values,signedIn,setSignedIn}) => {


    const responseSuccessGoogle =(response)=>{
        console.log("Success Response",response);
       
       axios.post(`${API}/googlelogin`,{tokenId:response.tokenId})
       .then(
           response=>{
             //authenticate - to set the data in localStorage
               authenticate(response.data,()=>setValues({...values,didRedirect:true}))
               setSignedIn(true)
           }
       ).catch(err=>{
           setValues({...values,didRedirect:false,error:err.response.data.error})
           setSignedIn(false)
       })

     

    }
    const responseErrorGoogle =(response)=>{
        console.log("error Response",response);

    }

    
  useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: googleClientId,
            scope: 'email',
            plugin_name: "chat"
          });
        }
        gapi.load('client:auth2', start);
      }, []);
    
  return (
    <>


 
    <GoogleLogin
     
    clientId= '{googleClientId}'
    uxMode='popup'
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled} 
      className=' border text-base border-slate-700 w-full px-3 py-2 hover:bg-zinc-600 hover:text-white rounded-md'>
       
<i className="fab fa-google fa-x"></i> 
<span className='ml-3' style={{fontSize:"1em"}}>Login with Google </span>
      </button>
    )}
    buttonText="Login with google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </>
  )
}

export default Googlelogin