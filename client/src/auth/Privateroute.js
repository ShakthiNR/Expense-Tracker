import React from 'react'
import { isAuthenticated } from './index'
import {Navigate} from 'react-router-dom'
const Privateroute = ({children,check}) => {
    const auth = isAuthenticated()
    if(check ==='dashboard')
    {
        
        if(!auth) return <Navigate to='/signin' /> 
        else return children 

    }
    if(check ==='signin' || check === 'signup')
    {
        if(auth) return <Navigate to='/' /> 
        else return children

    }
    
      
  
}

export default Privateroute