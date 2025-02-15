import {createSlice} from '@reduxjs/toolkit';

const initialState={
    expenseData:null
}

const expenseSlice=createSlice({
    name:'expense',
    initialState,
    reducers:{
        setExpense:(state,action)=>{
            state.expenseData=action.payload;
        }
    }
});

export const {setExpense}=expenseSlice.actions;

export default expenseSlice.reducer;