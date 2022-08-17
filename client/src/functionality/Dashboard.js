import React from 'react'
import Navbar from '../core/Navbar'
import Chartleftside from './Chartleftside'
import Form from './Form'
import Footer from '../core/Footer'
import ScrollToTop from 'react-scroll-to-top'
const Dashboard = ({signedIn,setSignedIn}) => {
  const dashboardNav = ()=>{
    return(
      <>
      <div className=' '>
      <Navbar signedIn={signedIn} setSignedIn={setSignedIn} disableOtherNavLink={true}  />

      </div>
        
      </>
    )
  }

  return (
    <>
    <div className=''>
    <div className="sticky  top-0 z-50 bg-[#F2F4F5]"> 
      {dashboardNav()}
    </div>
    <div className="container mx-auto max-w-5xl text-center drop-shadow-lg text-gray-800 mt-4">

      <div className="flex flex-col  md:flex-row justify-between ">
        <div className='pt-5 px-6 order-3 md:order-1'>
          <Chartleftside/>
        </div>
        <div className=' mr-5 mt-5 ml-5 order-2'>
         <Form />
        </div>
      </div>

    </div>

<div className='mt-10'>
<ScrollToTop
        smooth
        style={{paddingLeft:"6px"}}
      />
<Footer />
</div>
   
    </div>

    


     
    </>
    
  )
}

export default Dashboard