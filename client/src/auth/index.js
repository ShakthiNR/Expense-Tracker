/*global chrome*/

import {API} from ".././backend"


export const signup=user=>{
    console.log("user are",user);
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    }).then(response =>{
        return response.json()
    }).catch(err=>{
        console.log("Error is",err);
    })
}

export const signin=user=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    }).then(response =>{
        console.log("hello");
        return response.json()
    }).catch(err=>console.log("Error is",err))
}

//Set the jwt key
export const authenticate = (data,next)=>{
    if(typeof window !=="undefined")
    {
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}

//get the jwt value
export const isAuthenticated = ()=>{
    if(typeof window =="undefined")
    {
        return false
    }
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }

}


//remove that jwt value
export const signout = next =>{
    
    if(typeof window !=="undefined")
    {
        //localStorage.removeItem("jwt");
        localStorage.clear();
        
        next();
        return fetch(`${API}/signout`,{
            method:"GET"
        }).then(response=>{
            return response.json()
        }).catch(err => console.log("Error is",err))
    }

    
}