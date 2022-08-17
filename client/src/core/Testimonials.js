import React, { useState } from 'react'
import Aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from 'react'





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





const Testimonials = () => {

  const { height, width } =useWindowDimensions();



  const [mobileWidth, setMobileWidth] = useState(false)
  
 

  useEffect(()=>{
    
    Aos.init({
      duration: 2000
    })

  },[])


  return (
    <>
    <section id="testimonial" ></section>
  
  <br className='hidden lg:block'/>
    
    <div className='bg-gray-100'>
    {/* max-w-7xl  */}
      <div className="flex flex-col min-h-screen justify-center items-center w-full lg:max-w-7xl container mx-auto  ">
      <div className="text-center m-10 text-2xl text-bold mt-10"></div>
      <div className='lg:shadow-md p-5 bg-white lg:rounded-xl ' >
      <div className=' text-center
           text-xl md:text-2xl  font-semibold bg-gradient-to-r bg-clip-text  text-transparent  
            from-purple-600 via-gray-600 to-purple-600  animate-text'>
             What Our Clients Says About Us...</div>
             <div className="bg-white antialiased ">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 p-6">
             
        <div data-aos={width > 800 ? "fade-left" :"zoom-in"} data-aos-duration="4000"  className="bg-purple-500 card  text-white p-6 rounded-lg md:col-span-2 lg:col-span-2">
          <div className="flex justify-start space-x-5">
          <img src="https://randomuser.me/api/portraits/men/11.jpg" className='h-8 w-8 rounded-full border border-purple-400' alt="user1" />
          <div>
            <h2  className="font-bold font-sm opacity-90">
            Patrik Lawrance
            </h2>
           
            <h3 className='text-xs opacity-50'>Manager,Boss Company</h3>
          </div>
          </div>

          <p className="mt-4 font-bold text-lg leading-tight opacity-95">
          Overcome my business finance challenge. It empower myself and be in complete control of my finances
          </p>
          <p className="mt-4 text-sm opacity-70">
            " Expenses are reported exactly. It has been so easy after we started using Expense Tracker App. The efficiency of expense reporting and reimbursement has improved multifold. Thanks for building it "
          </p>

        </div>
        <div data-aos={width > 800 ? "fade-right" :"zoom-in"}  className="bg-gray-700 card text-white p-6 md:row-start-2 lg:row-start-auto rounded-lg">
          <div className="flex justify-start space-x-5">
          <img src="https://randomuser.me/api/portraits/women/11.jpg" className='h-8 w-8 rounded-full ' alt="user1" />
          <div>
            <h2  className="font-bold font-sm opacity-90">
            Clara Cinderlla
            </h2>
           
            <h3 className='text-xs opacity-50'>Doctor</h3>
          </div>
          </div>

          <p className="mt-4 font-bold text-lg leading-tight opacity-95">
          Terrific concept. Easy to use
          </p>
          <p className="mt-4 text-sm opacity-70">
            " I absolutely LOVE this app! It has a great interface, is super easy to navigate, and has so many customizing options for the categories one can create for their best budgeting possible. "
          </p>
        </div>
        <div data-aos={width > 800 ? "fade-left" :"zoom-in"} className="bg-white card text-gray-800 p-6 rounded-lg   lg:row-start-2 border border-gray-300">
          <div className="flex justify-start space-x-5">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" className='h-8 w-8 rounded-full' alt="user1" />
          <div>
            <h2  className="font-bold font-sm opacity-90">
            Shakthi Aravid
            </h2>
           
            <h3 className='text-xs opacity-50'>Business Man</h3>
          </div>
          </div>

          <p className="mt-4 font-bold text-lg leading-tight opacity-95">
          Amazingly effective and incredibly authentic!
          </p>
          <p className="mt-4 text-sm opacity-70">
            " It helps in stay within the budget with preset spending limits "
          </p>
        </div>

        <div data-aos={width > 800 ? "fade-right" :"zoom-in"} className="bg-gray-900  card text-white p-6 rounded-lg md:row-start-2 lg:col-span-2">
          <div className="flex justify-start space-x-5">
          <img src="https://randomuser.me/api/portraits/women/1.jpg" className='h-8 w-8 rounded-full' alt="user1" />
          <div>
            <h2  className="font-bold font-sm opacity-90">
            Anderia Tara
            </h2>
           
            <h3 className='text-xs opacity-50'>Software Engineer</h3>
          </div>
          </div>

          <p className="mt-4 font-bold text-lg leading-tight opacity-95">
          Optimize your expenses by using this application.
          </p>
          <p className="mt-4 text-sm opacity-70">
            " Enjoy and easy to use this expenses keeping application. And it is Packed with all the features and perks you deserve, the FounderOne Card also comes integrated with expense management tools that help you separate personal and business expenses"
          </p>
        </div>
        <div data-aos={width > 800 ? "flip-left" :"zoom-in"} className="bg-white card text-gray-800 p-6 rounded-lg lg:row-span-2 lg:row-start-1 lg:col-start-4 border border-gray-300">
          <div className="flex justify-start space-x-5">
          <img src="https://randomuser.me/api/portraits/men/18.jpg" className='h-8 w-8 rounded-full' alt="user1" />
          <div>
            <h2  className="font-bold font-sm opacity-90">
            Aaron Brayden
            </h2>
           
            <h3 className='text-xs opacity-50'>Verified Graduate</h3>
          </div>
          </div>

          <p className="mt-4 font-bold text-lg leading-tight opacity-95">
           Great app for tracking your spending! If you're like me and need a budget, this helps !!!
          </p>
          <p className="mt-4 text-sm opacity-70">
            " This is the first time I use a budget app, and I just love it. Is so easy and convenient to use. It has all I was looking for. I'm very satisfied 😀. Expense Tracker is a truly helpful app. I use it everyday for tracking personal spending and income. I haven't felt the need to upgrade, so free is always a plus. It's an easy to use format, and has always worked flawlessly on my Kindle. Extremely satisfied consumer here. "
          </p>
        </div>
</div>





              </div>



      </div>


      </div>

    </div>
   
    </>
  )
}

export default Testimonials