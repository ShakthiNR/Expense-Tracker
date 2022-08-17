import React, { useState } from 'react'
import 'boxicons'
import {default as api} from "../features/apiExpenseSlice"
import { isAuthenticated } from '../auth'
import { getSum } from '../helper/helperLoadash'





const Listthetransactions = ({editId,setEditId,reload,setReload}) => {
    const {user}=isAuthenticated()

   

const {data,isFetching,isSuccess,isError,refetch} =api.useGetLabelsQuery(user._id)
const [deleteTransaction] =api.useDeleteTransactionMutation()
//console.log("data",data);

const handleClickEdit = (id)=>{
 console.log("Id to edit is",id);
   // console.log("SetThatEditId to edit is",editId);

  
    setEditId(id)
    setReload(!reload)
    return
   
}

const Transaction = (category) =>{
  
    if(!category) return null
    return(
        <>
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r " style={{borderRight:`8px solid  ${category.categories_info[0].color ?? "#e5e5e5"}` }}>
            <button className='px-3'>
            


            <box-icon name='trash' onClick={()=>handleClickDelete(category._id,category.name)} color={category.categories_info[0].color ?? "#e3e3e3"}></box-icon>
            </button>
            <button className='px-3'>
            <box-icon type='solid' name='edit' onClick={()=>{ handleClickEdit(category._id)}} color={category.categories_info[0].color ?? "#e3e3e3"}></box-icon>
            </button>
            <span className='block w-full text-sm md:text-base'>{category.name}</span>
        </div>
        
        </>
    )
}



  const handleClickDelete =(id,name)=>{
   
    if (window.confirm(`Are you sure, you want to delete this ${name} ?` )) {
      console.log("Id is",id);
       deleteTransaction(id)
        setEditId(0)
    
    //  refetch()
      } else {
        console.log("You pressed Cancel Button!")
      }
  }

  return (
    <>
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 text-lg md:text-xl font-bold'> { getSum(data).length>0 && (<>History</>) }</h1>

{data && data.map((el,i)=>
<span key={i}>{ Transaction(el)} </span>

)
}

        
       
    </div>
    </>
  )
}

export default Listthetransactions

