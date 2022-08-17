import {createSlice} from "@reduxjs/toolkit"

let initialState = {
    categories:[],
    transaction:[],
    name:""
}

export const expenseSlice = createSlice({
    name:'expense',
    initialState, //initialState:initialState
    reducers:{
        getTransaction:(state)=>{

        },
        getTransactionUserName:(state,action)=>{
           
            state.name=action.payload
        }
    }
})

//dispatch action
export const {getTransaction,getTransactionUserName} = expenseSlice.actions
export default expenseSlice.reducer;