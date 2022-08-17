import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

//BaseUrl
const baseURI = "http://localhost:3001"


export const apiExpenseSlice = createApi({
    //use that BaseUrl
    baseQuery:fetchBaseQuery({baseUrl:baseURI}),
    tagTypes: ['categories', 'transaction','transactionToEdit'],
    /* 
    Api's Endpoint as below
    1. Default Method is GET no need to specify
    2. .Query - for GET Method
    3. .Mutation - for PUT,POST,DELETE 
    
    */

    endpoints:builder => ({
       
        //1. GET 
        getCategories: builder.query({
            //GET: localhost:3001/api/getCategories
            query:()=>"/api/getCategories",
            providesTags:['categories'] 
        }),

        //2. GET
        getLabels: builder.query({
            query:(id)=>`/api/getLabels/${id}`,
            providesTags:['transaction'] 
        }),

        getTransactionToEdit: builder.query({
            query:(id)=>`api/getoneTransaction/${id}`,
            providesTags:['transactionToEdit']
        }),

        //3.POST
        addTransaction: builder.mutation({
            query: (initialTransaction)=>({ //initialTransaction is parameter
                url:`/api/createTransaction`,
                method: "POST",
                body:initialTransaction
            }),
            invalidatesTags:['transaction'] //after POST method it calls transactions tag (ie) getLabels Query

        }),

        //4.DELETE
        deleteTransaction: builder.mutation({
            
            query: (deleteId)=>({
                url:`api/deletetransaction/${deleteId}`,
                method:"DELETE",
               // body:deleteId,
            }),
           invalidatesTags:['transaction']
        }),

        //5.update
        updateTransaction: builder.mutation({
            query:({id,...rest})=>({
                url:`/api/updateTransaction/${id}`,
                method:"PUT",
                body:rest,
            }),
            invalidatesTags:['transaction']
        })

    })
})

export default apiExpenseSlice;