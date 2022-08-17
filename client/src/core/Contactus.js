import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Bounce } from 'react-toastify';
import { isAuthenticated } from '../auth';
import Aos from 'aos'
import "aos/dist/aos.css"
import Accordion from './Accordion';
const Contactus = () => {
  const accordionData = [
    {
      title: 'What is expense management?',
      content: `Expense management is a reporting solution which captures people's expenses and helps have a comprehensive view on it through a robust reporting mechanism. It helps user's to manage end-to-end expense workflow.`
    },
    {
      title: 'How does expense management help people streamline their finances?',
      content: `An expense management software empowers the financial work with easy workflows for faster processing and provides a single view of all your expenses to track budgets (and keep them in check).`
    },
    {
      title: 'How to use Expense Tracker application?',
      content: 'Add your daily transaction with different modes. There are three modes namely Savings, Expenses, Investment. And you can view the graphical representation of your expenses which changes dynamically based on transactions. And we can edit/ delete/ create these transaction.'
    },
    {
      title:"Who developed this Expense Tracker Application?",
      content:"Expense Tracker Web Application was developed by Shakthi Naarayanan R, Independent Full Stack Developer."
    },
    {
      title:"Is Expense Tracker Application is available for mobile?",
      content:"Expense Tracker Mobile App is coming soon ... :)"
    },
  ];
  
  
  
  
  
  const { title, content } = accordionData;




  useEffect(()=>{
    Aos.init()

  },[])
  const [details,setDetails]=useState({name:"",email:"",msg:""})

  const {user} = isAuthenticated()
 
const [success,setSuccess] = useState(false)
  const {name,email,msg} = details
  const templateParams = {
    name: name,
    email:email,
    msg:msg,
  //  user_email: email
};


const displaySignedInMsg = ()=>{
 
if(success)
{
  toast.success("FeedBack Sent :) ", { 
    position: "top-right",
    autoClose: 3000,
    transition: Bounce,
    pauseOnHover: false,
  });
setSuccess(false)
}
   
  
}

  const myRef = useRef(null)
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    if(!user)
    {
      alert('Please signIn to your account to share feedBack')
      return
    }

    emailjs.send('service_cn8e3c9', 'template_9e1n0gx', templateParams, '6SVAIWzAeUvNSdEvP',)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);

          setDetails({name:"",email:"",msg:""})
          setSuccess(true)
      }, (error) => {
          console.log("Failed",error.text);
      })
  };


  
const accordion = ()=>{
  return(
    <div className='pb-20' >

<div className='border pb-5 bg-white border-gray-100 max-w-7xl mx-auto lg:rounded-xl lg:shadow-md '>

  
<div className=''>

    <h1 className='text-xl md:text-2xl font-semibold text-black text-center mb-10 mt-10'>Frequently Asked Questions</h1>
    <div className="accordion">
      {accordionData.map(({ title, content }) => (
        <Accordion title={title} content={content} />
      ))}
    </div>
  </div>

  </div>

   
    
    </div>
  )
}



  return (
<>



<section id='contactus' ></section>

<br className='md:hidden'/>
<br className='md:hidden'/>
<br className='hidden md:block lg:hidden'/>

<div className='antialiased ' >
  <div className="flex w-full min-h-screen justify-center  lg:bg-gray-100 items-center">
    <div className='flex flex-col lg:flex-row bg-white  md:space-x-6 max-w-7xl space-y-6 md:space-y-0  p-8 sm:px-12 sm:py-10  lg:rounded-xl lg:shadow-md ' >

      
        <div className='flex flex-col md:py-4  md:max-w-3xl mr-0 lg:mr-40 mb-5 lg:mb-0  space-y-8 md:space-y-16 lg:space-y-24 ' data-aos="zoom-in" data-aos-duration="1500">
          <div className="">
            <h1 className=' text-xl md:text-2xl  py-2 font-semibold bg-gradient-to-r bg-clip-text tracking-wide  text-transparent from-purple-600 via-gray-600 to-purple-600 animate-text 
'>Get In Touch</h1>
            <p className='mt-2 text-base md:text-lg'>
            Want to get in touch? We'd love to hear from you. Here's how you can reach us...
            </p>
          </div>

          <div className='flex flex-col space-y-6'>


            <div className='inline-flex space-x-2 items-center'>
              
            <ion-icon name="call" style={{fontSize:"110%",lineHeight:"28px"}}></ion-icon> <span className='text-base '>+(91) 7765432109</span>
            </div>
            <div className='inline-flex space-x-2 items-center'>
            <ion-icon name="mail"  style={{fontSize:"110%",lineHeight:"28px"}}></ion-icon> <span className='text-base '>contactshakthir@gmail.com</span>
            </div>
            <div className='inline-flex space-x-2 items-center'>
            <ion-icon name="pin" style={{fontSize:"110%",lineHeight:"28px"}}></ion-icon> <span className='text-base '>15th street, Anna Nagar Chennai-600028</span>
            </div>


          

          </div>

          
        </div>
        {
        displaySignedInMsg()
        }
       
        <div className="rounded-xl shadow-lg p-8 md:max-w-full  bg-gray-100" data-aos="zoom-in" data-aos-duration="1500" >
          <div className="text-center text-xl md:text-2xl mb-3  text-bold">User's FeedBack</div>
            <form className='flex flex-col space-y-4' ref={form} onSubmit={sendEmail} >
              <div>
                <label className='text-sm'>Your Name</label>
                <input type="text" placeholder='Your Name'
                onChange={(e)=>{setDetails({...details,name:e.target.value})}}
                value={name}
                  className='ring-1 mt-2 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-purple-500 placeholder:text-sm placeholder:md:text-base text-sm md:text-base' required/>

              </div>
              
              <div>
                <label className='text-sm'>Your Email-Address</label>
                <input type="email" placeholder='Your Email-Address'  
                onChange={(e)=>{setDetails({...details,email:e.target.value})}}
value={email}
                className='ring-1 mt-2 ring-gray-300 w-full placeholder:text-sm placeholder:md:text-base text-sm md:text-base rounded-md px-4 py-2 outline-none focus:ring-purple-500' required/>

              </div>
              <div>
                <label className='text-sm'>Message</label>
                <textarea 
                rows={4}
                 placeholder='Message' 
                onChange={(e)=>{setDetails({...details,msg:e.target.value})}}
                value={msg}
                  className='ring-1 ring-gray-300 w-full placeholder:text-sm placeholder:md:text-base text-sm md:text-base rounded-md mt-2 px-4 py-2 outline-none focus:ring-purple-500' required/>

              </div>
             
              <button className='inline-block self-end font-bold bg-purple-500 text-white rounded-lg py-2 px-6 hover:bg-purple-600 uppercase text-sm tracking-wide' type="submit">Send Message</button>

             
             
            </form>



          </div>





        <div>

        </div>

      

    </div>

 
  </div>
  <div className='bg-gray-100'>
  {accordion()}

  </div>
 
<hr/>
</div>

</>
  )
}

export default Contactus