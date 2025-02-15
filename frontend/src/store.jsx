import {configureStore} from '@reduxjs/toolkit';
import  budgetSlice  from './slices/budgetSlice.jsx';
import  authSlice  from './slices/authSlice.jsx';
import expenseSlice from './slices/expenseSlice.jsx';


export const store = configureStore({
    reducer: {
        budget:budgetSlice,
        auth:authSlice,
        expense:expenseSlice
    }
});

