import React, { useState } from 'react'
import {Chart,ArcElement} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import Lables from './Lables'
import { chartData, getTotal } from '../helper/helperLoadash'
import { isAuthenticated } from '../auth'
import {default as api} from "../features/apiExpenseSlice"

Chart.register(ArcElement)

const config = {
  
    data:{
        datasets: [{
            
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
            borderRadius:30,
            spacing:6,
         
          }]

    },
    options:{
        cutout:115 //Decrease the width of chart
    }
  }

  
  



const Chartleftside = () => {


const [load,setLoad] =useState(false)
  const {user} = isAuthenticated()
  const {data,isFetching,isSuccess,isError} = api.useGetLabelsQuery(user._id)
  let chartDataValue;

  if(isFetching)
  {
    
    chartDataValue = <div className='flex w-[50vw] h-[50vh] justify-center items-center'>
      <img src="https://ssl.gstatic.com/s2/oz/images/notifications/spinner_32_041dcfce66a2d43215abb96b38313ba0.gif" 
    alt="Loading ..." className='w-[20px] h-[20px]' onLoad={()=>setLoad(true)}  /> {load && (<span className='ml-3'> Loading ...</span>)}</div>

  }
  else if(isSuccess)
  {
   // getSum(data,'type')
   // console.log("gettotal",getTotal(data));
    chartDataValue= <Doughnut {...chartData(data)} /> //chartData is function will return config in helper file

  }
  else if(isError)
  {
    chartDataValue=<div>Error</div>

  }





  return (
   <>
   
  
   <div className="flex justify-center max-w-xs mx-auto">
    <div className="item">
      {
        !isFetching ? (<>
         <div className="chart relative">
          {/*   <Doughnut {...config} />  ---- spread the config to save the options */}
          {chartDataValue}
          {
            isSuccess && (<>
             <h3 className='mb-4 font-bold title text-lg md:text-xl '>Total
            <span className='block text-2xl md:text-3xl text-emerald-400 '>$ {getTotal(data)}</span>
            </h3>
            
            </>)
          }

           
        </div>
        <div className="flex flex-col py-10 gap-4">
            <Lables />
        </div>
        
        </>) : (<div className='flex w-[50vw] h-[50vh] justify-center items-center'>
        <img src="https://ssl.gstatic.com/s2/oz/images/notifications/spinner_32_041dcfce66a2d43215abb96b38313ba0.gif" 
    alt="Loading ..." className='w-[20px] h-[20px]' 
    onLoad={()=>setLoad(true)}/> {load && (<span className='ml-3'> Loading ...</span>)}
        </div>)
      }
       
    </div>
    
   </div>
   </>
  )
}

export default Chartleftside