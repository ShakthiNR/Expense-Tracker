import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routers from './Routers';
import { BrowserRouter } from 'react-router-dom';
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import expenseSlice from './features/expenseSlice';
import {apiExpenseSlice} from "./features/apiExpenseSlice"


const store = configureStore({
    reducer:{
        expense:expenseSlice,
        [apiExpenseSlice.reducerPath]:apiExpenseSlice.reducer
    },
    middleware:getDefaultMiddleware => getDefaultMiddleware().concat(apiExpenseSlice.middleware)

})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <BrowserRouter>
    <Routers />
    </BrowserRouter>
</Provider>
   
);


