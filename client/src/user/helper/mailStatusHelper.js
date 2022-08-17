import {API} from "../../backend"
export const mailStatusHelper = (verificationtoken)=>{
    console.log(verificationtoken);
    return fetch(`${API}/confirm/${verificationtoken}`,{
        method:"GET"
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
} 


/*
Resend Mail feature is removed
 export const resendMail = (email,firstName,lastName)=>{
    console.log("names",firstName,lastName);
    return fetch(`${API}/verification/account/resend/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            email:email,firstName:firstName,lastName:lastName
          })

    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
} */