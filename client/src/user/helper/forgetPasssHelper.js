import {API} from "../../backend"

export const forgetPassword =(email)=>{
    return fetch(`${API}/reset-password`,{
        method:"POST",
        headers:{
            Accept:"application/json",
           "Content-Type": "application/json",
        },
        body:JSON.stringify({email})
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))

}


export const checkToken = (verificationtoken)=>{
    return fetch(`${API}/checktoken/${verificationtoken}`,{
        method:"GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
}



export const updatePassword =(pass1,pass2,verificationToken)=>{
    return fetch(`${API}/password/reset/${verificationToken}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
           "Content-Type": "application/json",
        },
        body:JSON.stringify({newpassword1:pass1,newpassword2:pass2})
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))

}