import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    
<footer className="bg-[#1D1E25] ">
{/*  px-16 py-10 container mx-auto*/}
      <div
        className=" px-[5%] md:px-[6%] lg:px-[8%] xl:px-[0%] py-10  flex flex-col-reverse justify-between max-w-7xl  mx-auto  space-y-8 md:flex-row md:space-y-0"
      >
       
        <div
          className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start"
        >
          <div className="mx-auto text-sm my-6 text-center text-white  md:hidden">
            Copyright &copy; 2022, All Rights Reserved
          </div>
           <div>
            <span className='
             text-xl md:text-2xl  font-semibold  font-bold bg-gradient-to-r bg-clip-text  text-transparent  
             from-white via-gray-400 to-purple-500  animate-text cursor-pointer
            '>Expense Tracker</span>
            
          </div>
          <div className="flex justify-center space-x-4">

          <i className='fab fa-facebook fa-2x   text-white hover:text-purple-500 hover:cursor-pointer'></i>
          <i className='fab fa-youtube fa-2x h-8 text-white hover:text-purple-500 hover:cursor-pointer'></i>
          
          <i className='fab fa-twitter fa-2x h-8 text-white hover:text-purple-500 hover:cursor-pointer'></i>

          <i className='fab fa-instagram fa-2x h-8 text-white hover:text-purple-500 hover:cursor-pointer'></i>

          


          </div>
        </div>
        <div className="flex justify-around space-x-32 text-sm md:text-base  text-white">
          <div className="flex flex-col space-y-3  text-sm md:text-base">
           
            <a href="#" className="hover:text-purple-500">Home</a>
            <a href="#" className="hover:text-purple-500">Dashboard</a>
            <a href="#" className="hover:text-purple-500">Testimonials</a>
            <a href="#" className="hover:text-purple-500">About Us</a>
          </div>
          <div className="flex flex-col space-y-3  text-sm md:text-base">
            <a href="#" className="hover:text-purple-500">Careers</a>
            <a href="#" className="hover:text-purple-500">Community</a>
            <a href="#" className="hover:text-purple-500">Privacy Policy</a>
          </div>
        </div>

        <div className="flex flex-col justify-between  ">


          <form > 
            <div className="flex flex-row lg:flex-row md:flex-col md:items-center space-x-3">
              <input
                type="text"
                className="flex-1 px-4 md:py-2 lg:py-0 rounded-full lg:h-10 md:h-auto md:mb-5  text-sm md:text-base  lg:mb-0 focus:outline-none placeholder:text-sm placeholder:md:text-base"
                placeholder="Updated in your inbox"
              />
              <button
                className="text-white  md:w-1/3 md:mt-0 lg:mt-0  px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-500 focus:outline-none text-sm md:text-base "
              >
                Go
              </button>
            </div>
          </form>




          <div className="hidden md:block md:pt-3 lg-pt-0 sm:text-white md:text-white ">
            Copyright &copy; 2022, All Rights Reserved 
          </div>
        </div>
      </div>
    </footer>

    </>
  )
}

export default Footer