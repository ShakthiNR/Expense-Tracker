
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import EmailVerification from './user/EmailVerification'
import ForgetPassword from './user/ForgetPassword'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Updatepassword from './user/Updatepassword'
import Dashboard from './functionality/Dashboard'
import Navbar from './core/Navbar'
import Privateroute from './auth/Privateroute'
const Routers = () => {
  const [signedIn,setSignedIn] = useState(false)
  
  return (
    <>
     
    <Routes>
        <Route path='/' element={<Home signedIn={signedIn} setSignedIn={setSignedIn}/>} />
        <Route path='/signin' element={
        
        <Privateroute check={'signin'}>
        <Signin signedIn={signedIn} setSignedIn={setSignedIn} />
        </Privateroute>
        
        }/>
        <Route path='/signup'element={
          <Privateroute check={"signup"} >

<Signup/>
          </Privateroute>
       
        
        } />
        <Route path='/userdashboard' element={
          <Privateroute check={"dashboard"}>
            <Dashboard signedIn={signedIn} setSignedIn={setSignedIn}/>
          </Privateroute>
        
        
        
        } />
        <Route path='/forget-password' element={<ForgetPassword/>} />
        <Route path='/update-password/:verificationToken' element={<Updatepassword/>} />
        <Route path='/confirm/:verificationtoken' element={<EmailVerification />}/>
        
        {/* <Route path="*" element={<Navigate to='/'/>} /> */}

    </Routes>
    </>
  )
}

export default Routers