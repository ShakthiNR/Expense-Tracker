import React from 'react'
import Labelcomponents from './Labelcomponents'

import {default as api} from "../features/apiExpenseSlice"
import { isAuthenticated } from '../auth'
import { getLabels, getSum } from '../helper/helperLoadash'



export default function Lables () {
//data,isFetching,isSuccess,isError are Hooks
 
// const {data,isFetching,isSuccess,isError} =api.useGetCategoriesQuery() //getCategories is actual name of query, RTK add use at front,Query at back,capitalize the name
 // console.log("data",data);
  
  const {user} = isAuthenticated()
  const {data,isFetching,isSuccess,isError} = api.useGetLabelsQuery(user._id)
 

  let Transaction;

  if(isSuccess)
  {
   // getSum(data,'type')
   // getLabels(data)
    Transaction = getLabels(data).map((el,index)=>
        
      <Labelcomponents key={index} data={el} />
    )

  }
  else if(isError)
  {
    Transaction=<div>Error</div>

  }
  
  return (
    <>
  {Transaction}
      
    </>
  )
}




