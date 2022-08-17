import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="">
    <div className={isActive ? "flex text-lg text-purple-500 font-semibold flex-row justify-between cursor-pointer  hover:bg-gray-100 px-5 py-3  " : "flex text-lg text-[#4A4A4A] flex-row justify-between cursor-pointer border-b-2 border-gray-200 hover:bg-gray-100  px-5 py-3"} onClick={() => setIsActive(!isActive)}>
     
      <div className=" w-[98%] md:w-auto text-base md:text-lg">{title}</div>


      <box-icon name='chevron-down' color={isActive ? "rgb(168 85 247)" :"gray"}  style ={
        {
          transform: isActive ?"rotate(-180deg) " : 'rotate(0deg)',
          transition: isActive ?"transform 0.3s linear":" transform 0.3s linear",
         }
        
        
        
        }></box-icon>


 



    </div>
    {isActive && <div className="p-1 pl-5 pb-5 border-b-2 text-base md:text-lg   border-gray-200 ">{content}</div>}
  </div>
  );
};

export default Accordion;