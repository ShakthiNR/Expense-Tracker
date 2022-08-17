import React, { useEffect, useRef, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {  Bounce } from 'react-toastify';
  import ScrollToTop from "react-scroll-to-top";
import Testimonials from './Testimonials';
import Contactus from './Contactus';
import {useSelector} from 'react-redux'
import Accordion from './Accordion';
import _ from "lodash"
import { isAuthenticated } from '../auth';
import { useNavigate } from 'react-router-dom';



const Home = ({signedIn,setSignedIn}) => {
 // const toastId = React.useRef(null)

 const navigate = useNavigate()

 const user = useSelector((state)=>state.expense.name)



const [offset, setOffset] = useState(0);
 
//const [nextActiveDiv,setNextActiveDiv]=useState(false)
 useEffect(() => {
  const onScroll = () => setOffset(window.pageYOffset);
  // clean up code
  window.removeEventListener('scroll', onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);




 
  const displaySignedInMsg = ()=>{
    if(signedIn)
    {
    
      console.log("signed In successfully!!!");
    
      /* toast.success(" Signed In Successfully !!! ", { 
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
        pauseOnHover: false,
      }); */
      
    }
  }


  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
   function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }

  const { height, width } =useWindowDimensions();

  const navigateDashboard =()=>{
    navigate('/userdashboard')
  }

  const handleClick = ()=>{
    isAuthenticated() ? (navigateDashboard()) :(<>{alert('Login Required')}</>)  
  }
const homeSection = ()=>{
  return(
    <div>
    <div className='border pl-5 max-h-40 max-w-xs m-5 bg-gray-100 hidden md:block rounded-md  hover:bg-white' style={{marginLeft:"auto",marginRight:25}}>
     <div className='text-center p-5  md:text-base font-semibold  '>
     Hi, {user ?(<> <span className='text-purple-500 hover:text-purple-600  '>{ _.startCase(_.toLower(user))}  </span> </>)  :<span className='text-purple-500 hover:text-purple-600'>Anonymous User!!</span>} 
     </div>

   
    </div>
    
   
    <div className=''>
      
   <div className="flex flex-col justify-center  items-center h-[85vh] md:h-[68vh]" > {/* Before(hi,user) it is 85vh  */}
  

<div className=' text-center px-1 md:px-0'>
   <span className='
           text-xl md:text-2xl  bg-gradient-to-r bg-clip-text  text-transparent  
            from-purple-600 via-gray-600 to-purple-600  animate-text' >
              Free of Cost </span>
<span className=' text-xl md:text-2xl '>for managing your Official Expenses !</span>
   </div>
   <div className="text-base md:text-lg text-gray-900 text-center max-w-7xl px-5 container mx-auto " style={{marginTop:"32px"}}>
    
   With our Expense Management tool, capture all expenses made for official purposes, including business travel, directly on a single platform. Our easy-to-use tool is free of cost and will ensure that you can effortlessly 
   reconcile and reimburse all expenditures made by your employees.

   </div>
   <div className='mt-6 md:mt-8 lg:mt-10'>
    <button onClick={handleClick} className='border border-gray-700 px-20 py-3 hover:bg-black hover:text-white text-xl '>Get Started</button>
   
   </div>
   </div>







    </div>
       
 
    

    
    </div>
  )
}




/* //calculating height based on 100vh
const testing = ()=>{
  var viewportScreenHeight = document.documentElement.clientHeight * 0.65;
   console.log("%%%%%%%%%%%%%%%%%%%");
console.log("screenHeight",viewportScreenHeight);
console.log("changing ht",offset);
console.log("%%%%%%%%%%%%%%%%%%%"); 
if(offset- viewportScreenHeight * 0.65 < 0)
{
  console.log("first ht",offset- viewportScreenHeight * 0.65);
  console.log("first");
}
else if(offset-viewportScreenHeight < 2*(viewportScreenHeight * 0.65)*1.9)
{
  console.log("second",offset-viewportScreenHeight, 2*(viewportScreenHeight * 0.65))
}
else{
  console.log("third");
}
    
  
} */
const autoSelectDiv =()=>{
  const sections = document.querySelectorAll("section");

  const navLi = document.querySelectorAll("nav .container ul li");
 // var clientHeight = document.getElementById('myHomeht').clientHeight;
 // console.log("objects are",clientHeight);

}


  return (
    <div className='bg-[#F2F4F5]'>
 
   
{autoSelectDiv()}
   
   
    <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
   {displaySignedInMsg()}
 
    
    <ToastContainer/>
   {homeSection()}
  
 
         
         <Testimonials />
         <Contactus />
         {/* {accordion()} */}


  
   <ScrollToTop
        smooth
        style={{paddingLeft:"6px"}}
      />

  <Footer/>
 
    </div>
  )
}

export default Home