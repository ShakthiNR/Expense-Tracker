import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import Listthetransactions from './Listthetransactions'
import {default as api} from '../features/apiExpenseSlice'
import {skipToken} from '@reduxjs/toolkit/query'
import { isAuthenticated } from '../auth'
const Form = () => {

  const {register,handleSubmit,reset,resetField}=useForm() //destructing it, handleSubmit is to get all data and reset is to reset all the form fields
  const [addTransaction] = api.useAddTransactionMutation() //use - prefixed and Mutation is postfixed in addTranaction
  const [editId,setEditId]=useState(0)
  const [clear,setClear]=useState(false)
  const [toggle,setToggle]=useState(false)
  const {data,isSuccess,refetch} = api.useGetTransactionToEditQuery((editId!==0) ? editId : skipToken)
  const [updateTransaction] =api.useUpdateTransactionMutation()
//console.log("data to be edited", api.useGetTransactionToEditQuery((editId) ? editId : skipToken))





const [reload,setReload]=useState(false)
 const updateInputValue = (name,type,amount)=>{

  let defaultValues = {};
  defaultValues.name=name;
  defaultValues.type=type;
  defaultValues.amount=amount;
  reset({ ...defaultValues });
  return
 }
 
 useEffect(()=>{
  refetch()
 
 },[reload])


 useEffect(()=>{
  
  if(isSuccess)
  {
    refetch()
   
    updateInputValue(data.name,data.type,data.amount)
    setToggle(true)
    
  }
 },[data,editId,reload])



 /*  useEffect(()=>{
  console.log("from useEffect id to edit is",editId);
  console.log("isSuccess is",isSuccess);
  console.log("data in useeffect",data);
    if(isSuccess)
    {
      console.log("toggle",toggle);
      updateInputValue(data.name,data.type,data.amount);
      setToggle(true)
    }
    if(clear)
    {
      updateInputValue("","","");
      setToggle(!toggle)
    }


  },[editId,data,clear])
 */

const onSubmit=(data)=>{
  const {name,type,amount} =data
  const {user} = isAuthenticated()
  const id = user._id
  if(isSuccess && toggle)
  {
    console.log("updated Data is",data);
    if(!data) return {};
  
    setTimeout(()=>{
      alert('Data Updated!!!')
      updateTransaction({id:editId,name,type,amount}).unwrap();
      updateInputValue("","","")
      setToggle(false)
    },1000)
  }
  else{
  
    if(!data) return {};
    addTransaction({name,type,amount,user:id}).unwrap();
    reset()
  }



}
  return (
    <>
    
    <div className="form max-w-sm mx-auto md:w-96  ">
        <h1 className='font-bold pb-4 text-lg md:text-xl mb-8'>Add Transaction </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text"  className='form-input  placeholder:text-sm placeholder:md:text-base text-sm md:text-base' {...register('name')} placeholder='Salary, House Rent, Stocks' required /> <br/>

            <select className='form-input placeholder:text-sm placeholder:md:text-base text-sm md:text-base' {...register('type')} required>
                <option  value="" >Select Type of Transaction</option>
                <option value="Investment">Investment</option>
                <option value="Savings">Savings</option>
                <option value="Expense">Expense</option>

            </select>

            <input type="number"   className='form-input placeholder:text-sm placeholder:md:text-base text-sm md:text-base' {...register('amount')} placeholder='Amount'  required/> <br/>
            <div className='flex gap-x-7'>

{
  toggle ? (<>
  <button type="submit" className='btn-submit bg-purple-500 hover:bg-purple-600 w-1/2'>Update Transaction</button>
<button type='reset'  className='btn-submit w-1/2 bg-red-500 hover:bg-red-600' onClick={()=>{
 setToggle(false)
 setEditId(0)
 updateInputValue("","","")
}
  
  }>Cancel</button>
  </>):(<>
  <button type="submit" className='btn-submit text-sm md:text-base bg-purple-500 hover:bg-purple-600 w-full'>Add Transaction</button>
  </>)
}
           

           

            </div>
            
        </form>

        <Listthetransactions editId={editId} setEditId={setEditId} reload={reload} setReload={setReload} />
    </div>
    </>
  )
}

export default Form