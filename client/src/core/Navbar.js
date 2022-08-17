import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { signout, isAuthenticated } from "../auth/index"
import { googleClientId } from '../backend';
import { gapi } from 'gapi-script';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { Link as Link1 } from 'react-scroll'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { getTransactionUserName } from '../features/expenseSlice';

const customId = "custom-id-yes";
const Navbar = ({ setSignedIn, disableOtherNavLink }) => {


  const [active, setActive] = useState({ div1: false, div2: false, div3: false })
  const { div1, div2, div3 } = active
  const [closeBtn, setCloseBtn] = useState(false)
  const navigate = useNavigate()
  const [color, setColor] = useState(false)
  const dispatch = useDispatch()




  const changeColor = () => {
    if (window.scrollY >= 25) {
      setColor(true)
    }
    else {
      setColor(false)
    }
  }

  window.addEventListener('scroll', changeColor)

  const notify = () => toast.success(" Signed Out Successfully !!! ", {
    toastId: customId,
    position: "top-right",
    autoClose: 5000,
    transition: Bounce,
    pauseOnHover: false,
    progressClassName: 'fancy-progress-bar',
  });


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,
        scope: 'email',
        plugin_name: "chat"
      });
    }
    gapi.load('client:auth2', start);
  }, []);





  const logout = () => {
    notify()
    if(user)
    {
      console.log("helo friom logout")
     let afterLogoutUserName=""
      dispatch(getTransactionUserName(afterLogoutUserName))
    }

    signout(() => { navigate("/") })
    gapi.auth2.getAuthInstance().disconnect()
  }
  setSignedIn(false)
  //  console.log("signOut successfully");


  const displayMenu = () => {
    setCloseBtn(!closeBtn)
    var menu = document.getElementById("mobileMenu")
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden')


    }
    else {
      menu.classList.add('hidden')


    }

  }

  const signInButton = () => {
    return (
      <Link to='/signin'
        className='flex text-purple-900 bg-white h-fit  rounded-2xl
    px-3  py-2
    shadow-inherit
     hover:text-purple-500 cursor-pointer
     transition ease-in-out hover:shadow-gray-900
     delay-150 bg-white hover:-translate-y-0.5  hover:text-purple-500  duration-150 transition-all
    '
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        <span className='ml-3'> Sign In</span>
      </Link>
    )
  }

  const signUpButton = () => {
    return (
      <>
        <Link to='/signup'
          className='flex text-purple-900 bg-white h-fit  rounded-2xl
    px-3  py-2
    shadow-inherit
     hover:text-purple-500 cursor-pointer
     transition ease-in-out hover:shadow-gray-900
     delay-150 bg-white hover:-translate-y-0.5  hover:text-purple-500  duration-150 transition-all
    '
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span className='ml-3'> Sign Up</span>
        </Link>



      </>
    )
  }

  const mobileMenu = () => {
    return (
      <>
        <div className='hidden' id='mobileMenu'>
          <ul className='lg:hidden  ml-auto font-semibold text-base mt-5 text-center' >
            <li className='mt-5'>
              <Link1 className='py-1 px-3 hover:bg-slate-100 cursor-pointer block hover:rounded-2xl  hover:text-purple-500 ' to='myHome' spy={true} smooth={true}>Home</Link1>
            </li>

            <li className='mt-3'>
              <Link className='py-1 px-3 hover:bg-slate-100  block hover:rounded-2xl   hover:text-purple-500 ' to='/userdashboard'>Dashboard</Link>

            </li>
            <li className='mt-3'>

              <Link1 className='py-1 px-3  hover:bg-slate-100 cursor-pointer  block hover:rounded-2xl   hover:text-purple-500 ' to='testimonial' spy={true} smooth={true}>Testimonial</Link1>
            </li>
            <li className='mt-3'>
              <Link1 className='py-1 px-3  hover:bg-slate-100 block hover:rounded-2xl cursor-pointer   hover:text-purple-500 ' to='contactus' spy={true} smooth={true}>Contact Us</Link1>
            </li>
            {
              !isAuthenticated() && (
                <>
                  <li className='mt-3'><Link to='/signin' className=' py-1 hover:bg-slate-100 block hover:rounded-2xl no-underline hover:text-fuchsia-600 '>Sign In </Link></li>
                  <li className='mt-3'><Link to='/signup' className=' py-1 hover:bg-slate-100 block hover:rounded-2xl no-underline hover:text-fuchsia-600 '>Sign Up</Link> </li>
                </>
              )
            }
            {
              isAuthenticated() && (
                <>
                  <li
                    className='mt-5 text-red-500 cursor-pointer'
                    onClick={() => {
                      logout()
                    }} >

                    Sign Out</li>
                </>)
            }
          </ul>
        </div>
      </>
    )
  }

  const signOutButton = () => {
    return (
      <>
        <li
          className=' text-red-500 cursor-pointer py-2 flex bg-white h-fit rounded-2xl
     px-3  py-2
     shadow-inherit
     hover:text-red-500 cursor-pointer
     transition ease-in-out hover:shadow-gray-900
     delay-150 bg-white hover:-translate-y-0.5  hover:text-purple-500  duration-150 transition-all
     '
          onClick={() => {
            logout()
          }} >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className='ml-3'>  Sign Out</span></li>
      </>
    )
  }


const {user} = isAuthenticated()


if(user)
{
  dispatch(getTransactionUserName(user.name))
}

  return (
    <>
      <section id="myHome"></section>
      <div className="sticky  top-0 z-50">

        <div  className='text-gray-800 nav'>
          {/* give className as p-5 */}
          <div className={color ? "pt-4 pb-2 px-5 bg-[#F2F4F5] " : "pt-4 pb-2 px-5"} >
            <div className='container mx-auto '>
              <div className='flex  max-w-7xl container mx-auto'>
                <a href="/" className=
                  {
                    color ? " text-xl md:text-2xl   py-2 font-semibold bg-gradient-to-r bg-clip-text  text-transparent from-black via-purple-500 to-neutral-900 animate-text  " :
                      " text-xl md:text-2xl   py-2 font-semibold bg-gradient-to-r bg-clip-text  text-transparent from-indigo-500 via-purple-500 to-indigo-500 animate-text "
                  }



                >Expense Tracker</a>
                {!disableOtherNavLink && (<>

                  <button className='lg:hidden mt-2 ml-auto' onClick={displayMenu}>

                    <box-icon name={closeBtn ? 'x' : 'menu'} color={closeBtn ? 'red' : "#3f3f46"}

                      style={{


                        transform: closeBtn ? "rotate(0deg)" : 'rotate(-180deg)',
                        transition: "transform 0.5s ease-in-out",



                      }}></box-icon>
                  </button>

                </>)}


                {/* {
  closeBtn && (<>
     <button className='lg:hidden mt-2 ml-auto' onClick={displayMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
            
          </button>
  
  </>)
} */}



                {!disableOtherNavLink ? (<>


                  <ul className='mt-2 ml-auto lg:flex font-semibold text-base hidden '>


                    <li className='pr-5 accent-zinc-600 py-2' >
                      <Link1 className={div1 ? "border-b-2 border-purple-500 text-purple-600 px-2     py-[10%] cursor-pointer " : " link-underline link-underline-black px-2  py-2 cursor-pointer   changeClass"} to='myHome' spy={true} smooth={true}
                        onClick={() => { setActive({ div1: true }) }}
                      >Home</Link1>
                    </li>
                    <li className='pr-5  py-2 '>
                      <Link1 className={div2 ? "border-b-2 border-purple-500 text-purple-600   px-2  py-[5%] cursor-pointer " : " px-2  py-2 link-underline link-underline-black cursor-pointer   changeClass"} to='testimonial' spy={true} smooth={true} onClick={() => { setActive({ div2: true }) }} >Testimonial</Link1>

                    </li>
                    <li className='pr-5  py-2'>
                      <Link1 className={div3 ? "border-b-2 border-purple-500 text-purple-600 px-2  py-[5%] cursor-pointer " : " px-2  py-2 link-underline link-underline-black cursor-pointer   changeClass"} to='contactus' spy={true} smooth={true} onClick={() => { setActive({ div3: true }) }}  >Contact Us</Link1>
                    </li>







                    {
                      !isAuthenticated() && (
                        <>
                          {signInButton()}
                          <span className='mx-3  py-2'> /</span>
                          {signUpButton()}
                        </>
                      )
                    }
                   

                    {
                      isAuthenticated() && signOutButton()

                    }

                  </ul>
                </>)
                  : (<>
                    <ul className='mt-2 ml-auto lg:flex font-semibold text-base '>
                      {
                        isAuthenticated() && signOutButton()

                      }
                    </ul>
                  </>)
                }
              </div>

              {!disableOtherNavLink && mobileMenu()}



            </div>


          </div>
        </div>

      </div>

      <div>


      </div>


    </>
  )
}

export default Navbar