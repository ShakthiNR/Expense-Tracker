import React from 'react'





const Labelcomponents = ({data}) => {
    if(!data) return<></>
    return (
    <>
    <div className="labels flex justify-between">
            <div className="flex gap-2">
                
                <div className= {'w-2 h-2 rounded py-3 '} style={{background:data.color[0]}} ></div>
                <h3 className='text-base md:text-lg'>{data.type ? data.type : 'Error'}</h3>
            </div>
            <h3 className='font-bold text-base md:text-lg'> {Math.round(data.percent) ? Math.round(data.percent): 0} %</h3>


        </div>
    </>
  )
}

export default Labelcomponents